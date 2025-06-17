import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { PosicionTrabajador } from "../entity/PosicionTrabajador.entity";

export class PosicionTrabajadorController {
  static async createPosicion(req: Request, res: Response): Promise<void> {
    try {
      const { posicion } = req.body;
      if (!posicion) {
        res.status(400).json({ message: "Posicion is required" });
        return;
      }

      const repo = AppDataSource.getRepository(PosicionTrabajador);
      const nuevoPosicion = repo.create({ posicion });
      await repo.save(nuevoPosicion);
      res.status(201).json({ message: "Posicion creada", data: nuevoPosicion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getPosiciones(_: Request, res: Response): Promise<void> {
    try {
      const repo = AppDataSource.getRepository(PosicionTrabajador);
      const posiciones = await repo.find();
      res.status(200).json(posiciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getPosicionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const repo = AppDataSource.getRepository(PosicionTrabajador);
      const posicion = await repo.findOne({ where: { posicionId: id } });

      if (!posicion) {
        res.status(404).json({ message: "Posicion no encontrada" });
        return;
      }

      res.status(200).json(posicion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async updatePosicion(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { posicion } = req.body;

      const repo = AppDataSource.getRepository(PosicionTrabajador);
      const posicionExistente = await repo.findOne({ where: { posicionId: id } });

      if (!posicionExistente) {
        res.status(404).json({ message: "Posicion no encontrada" });
        return;
      }

      posicionExistente.posicion = posicion;
      await repo.save(posicionExistente);

      res.status(200).json({ message: "Posicion actualizada", data: posicionExistente });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async deletePosicion(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const repo = AppDataSource.getRepository(PosicionTrabajador);
      const posicion = await repo.findOne({ where: { posicionId: id } });

      if (!posicion) {
        res.status(404).json({ message: "Posicion no encontrada" });
        return;
      }

      await repo.remove(posicion);
      res.status(200).json({ message: "Posicion eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
