import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { HorarioTrabajador } from "../entity/HorarioTrabajador.entity";
import { Trabajador } from "../entity/Trabajador.entity";

export class HorarioTrabajadorController {
  static async createHorario(req: Request, res: Response): Promise<void> {
    try {
      const {
        trabajadorId,
        lunes,
        martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        domingo,
      } = req.body;

      const trabajadorRepo = AppDataSource.getRepository(Trabajador);
      const horarioRepo = AppDataSource.getRepository(HorarioTrabajador);

      const trabajador = await trabajadorRepo.findOne({ where: { id: trabajadorId } });
      if (!trabajador) {
        res.status(404).json({ message: "Trabajador no encontrado" });
        return;
      }

      const horario = new HorarioTrabajador();
      horario.trabajador = trabajador;
      horario.lunes = lunes;
      horario.martes = martes;
      horario.miercoles = miercoles;
      horario.jueves = jueves;
      horario.viernes = viernes;
      horario.sabado = sabado;
      horario.domingo = domingo;

      await horarioRepo.save(horario);
      res.status(201).json({ message: "Horario creado", horario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getHorarios(_: Request, res: Response): Promise<void> {
    try {
      const horarioRepo = AppDataSource.getRepository(HorarioTrabajador);
      const horarios = await horarioRepo.find({ relations: ["trabajador"] });
      res.status(200).json(horarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getHorarioById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const horarioRepo = AppDataSource.getRepository(HorarioTrabajador);
      const horario = await horarioRepo.findOne({
        where: { id },
        relations: ["trabajador"],
      });

      if (!horario) {
        res.status(404).json({ message: "Horario no encontrado" });
        return;
      }

      res.status(200).json(horario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el horario" });
    }
  }


  static async updateHorario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        lunes,
        martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        domingo,
      } = req.body;

      const horarioRepo = AppDataSource.getRepository(HorarioTrabajador);
      const horario = await horarioRepo.findOne({ where: { id } });

      if (!horario) {
        res.status(404).json({ message: "Horario no encontrado" });
        return;
      }

      horario.lunes = lunes;
      horario.martes = martes;
      horario.miercoles = miercoles;
      horario.jueves = jueves;
      horario.viernes = viernes;
      horario.sabado = sabado;
      horario.domingo = domingo;

      await horarioRepo.save(horario);
      res.status(200).json({ message: "Horario actualizado", horario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async deleteHorario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const horarioRepo = AppDataSource.getRepository(HorarioTrabajador);

      const horario = await horarioRepo.findOne({ where: { id } });
      if (!horario) {
        res.status(404).json({ message: "Horario no encontrado" });
        return;
      }

      await horarioRepo.remove(horario);
      res.status(200).json({ message: "Horario eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
