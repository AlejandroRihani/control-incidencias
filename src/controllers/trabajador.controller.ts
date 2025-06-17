// controllers/TrabajadorController.ts
import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Trabajador } from "../entity/Trabajador.entity";
import { NivelTrabajador } from "../entity/NivelTrabajador.entity";
import { HorarioTrabajador } from "../entity/HorarioTrabajador.entity";
import { checarResetVacacionesSiEsNecesario } from "../utils/resetIncidencias.auto";


export class TrabajadorController {
  static async createTrabajador(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        nivelId,
        horarioId,
        disponiblePeriodo1,
        disponiblePeriodo2,
        disponiblePeriodo1Pasado,
        disponiblePeriodo2Pasado,
        disponibleTotal,
        diasVacacionesUsados,
        diasEconDisponibles,
        diasEconUsados,
      } = req.body;

      const trabajadorRepo = AppDataSource.getRepository(Trabajador);
      const nivelRepo = AppDataSource.getRepository(NivelTrabajador);
      const horarioRepo = AppDataSource.getRepository(HorarioTrabajador);

      const nivel = await nivelRepo.findOne({ where: { nivelId } });
      if (!nivel) {
        res.status(404).json({ message: "Nivel no encontrado" });
        return;
      }

      const horario = await horarioRepo.findOne({ where: { id: horarioId } });
      if (!horario) {
        res.status(404).json({ message: "Horario no encontrado" });
        return;
      }

      const nuevoTrabajador = trabajadorRepo.create({
        name,
        nivel,
        horario,
        disponiblePeriodo1,
        disponiblePeriodo2,
        disponiblePeriodo1Pasado,
        disponiblePeriodo2Pasado,
        disponibleTotal,
        diasVacacionesUsados,
        diasEconDisponibles,
        diasEconUsados,
      });

      await trabajadorRepo.save(nuevoTrabajador);
      res.status(201).json(nuevoTrabajador);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear trabajador" });
    }
  }

  static async getTrabajadores(_: Request, res: Response): Promise<void> {
    try {
      await checarResetVacacionesSiEsNecesario();
      const trabajadorRepo = AppDataSource.getRepository(Trabajador);
      const trabajadores = await trabajadorRepo.find({
        relations: [
          "nivel",
          "horario",
          "incidenciasAut",
          "incidenciasAut.tipoIncidencia"
        ],
      });
      res.status(200).json(trabajadores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener trabajadores" });
    }
  }

  static async getTrabajadorPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const trabajadorRepo = AppDataSource.getRepository(Trabajador);
      const trabajador = await trabajadorRepo.findOne({
        where: { id: String(id) },
        relations: [
          "nivel",
          "horario",
          "incidenciasAut",
          "incidenciasAut.tipoIncidencia"
        ],
      });

      if (!trabajador) {
        res.status(404).json({ message: "Trabajador no encontrado" });
        return;
      }

      res.status(200).json(trabajador);
    } catch (error) {
      console.error("Error al obtener trabajador por ID:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async updateTrabajador(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      const trabajadorRepo = AppDataSource.getRepository(Trabajador);
      const trabajador = await trabajadorRepo.findOne({
        where: { id: String(id) },
        relations: ["nivel", "horario"],
      });

      if (!trabajador) {
        res.status(404).json({ message: "Trabajador no encontrado" });
        return;
      }

      if (data.nivelId) {
        const nivelRepo = AppDataSource.getRepository(NivelTrabajador);
        const nivel = await nivelRepo.findOne({ where: { nivelId: data.nivelId } });
        if (!nivel) {
          res.status(404).json({ message: "Nivel no válido" });
          return;
        }
        trabajador.nivel = nivel;
      }

      if (data.horarioId) {
        const horarioRepo = AppDataSource.getRepository(HorarioTrabajador);
        const horario = await horarioRepo.findOne({ where: { id: data.horarioId } });
        if (!horario) {
          res.status(404).json({ message: "Horario no válido" });
          return;
        }
        trabajador.horario = horario;
      }

      Object.assign(trabajador, data);
      await trabajadorRepo.save(trabajador);
      res.status(200).json(trabajador);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar trabajador" });
    }
  }

  static async deleteTrabajador(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const trabajadorRepo = AppDataSource.getRepository(Trabajador);
      const trabajador = await trabajadorRepo.findOne({ where: { id: String(id) } });

      if (!trabajador) {
        res.status(404).json({ message: "Trabajador no encontrado" });
        return;
      }

      await trabajadorRepo.remove(trabajador);
      res.status(200).json({ message: "Trabajador eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar trabajador" });
    }
  }
}
