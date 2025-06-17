import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { NivelTrabajador } from "../entity/NivelTrabajador.entity";

export class NivelTrabajadorController {
  static async createNivel(req: Request, res: Response): Promise<void> {
    try {
      const { nivel } = req.body;
      if (!nivel) {
        res.status(400).json({ message: "Nivel is required" });
        return;
      }

      const repo = AppDataSource.getRepository(NivelTrabajador);
      const nuevoNivel = repo.create({ nivel });
      await repo.save(nuevoNivel);
      res.status(201).json({ message: "Nivel creado", data: nuevoNivel });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getNiveles(_: Request, res: Response): Promise<void> {
    try {
      const repo = AppDataSource.getRepository(NivelTrabajador);
      const niveles = await repo.find();
      res.status(200).json(niveles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getNivelById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const repo = AppDataSource.getRepository(NivelTrabajador);
      const nivel = await repo.findOne({ where: { nivelId: id } });

      if (!nivel) {
        res.status(404).json({ message: "Nivel no encontrado" });
        return;
      }

      res.status(200).json(nivel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async updateNivel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nivel } = req.body;

      const repo = AppDataSource.getRepository(NivelTrabajador);
      const nivelExistente = await repo.findOne({ where: { nivelId: id } });

      if (!nivelExistente) {
        res.status(404).json({ message: "Nivel no encontrado" });
        return;
      }

      nivelExistente.nivel = nivel;
      await repo.save(nivelExistente);

      res.status(200).json({ message: "Nivel actualizado", data: nivelExistente });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async deleteNivel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const repo = AppDataSource.getRepository(NivelTrabajador);
      const nivel = await repo.findOne({ where: { nivelId: id } });

      if (!nivel) {
        res.status(404).json({ message: "Nivel no encontrado" });
        return;
      }

      await repo.remove(nivel);
      res.status(200).json({ message: "Nivel eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
