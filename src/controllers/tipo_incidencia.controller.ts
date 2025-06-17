// controllers/TipoIncidenciaController.ts
import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { TipoIncidencia } from "../entity/TipoIncidencia.entity";

export class TipoIncidenciaController {
  static async createTipoIncidencia(req: Request, res: Response): Promise<void> {
    try {
      const { tipoIncidencia } = req.body;

      if (!tipoIncidencia) {
        res.status(400).json({ message: "El nombre es obligatorio" });
        return;
      }

      const repo = AppDataSource.getRepository(TipoIncidencia);
      const nueva = repo.create({ tipoIncidencia });
      await repo.save(nueva);

      res.status(201).json({ message: "Tipo de incidencia creado", data: nueva });
    } catch (error) {
      console.error("Error al crear tipo de incidencia:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getTiposIncidencia(_: Request, res: Response): Promise<void> {
    try {
      const repo = AppDataSource.getRepository(TipoIncidencia);
      const tipos = await repo.find();
      res.status(200).json(tipos);
    } catch (error) {
      console.error("Error al obtener tipos de incidencia:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getTipoIncidenciaPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const repo = AppDataSource.getRepository(TipoIncidencia);
      const tipo = await repo.findOne({ where: { id: String(id) } });

      if (!tipo) {
        res.status(404).json({ message: "Tipo de incidencia no encontrado" });
        return;
      }

      res.status(200).json(tipo);
    } catch (error) {
      console.error("Error al obtener tipo de incidencia por ID:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async updateTipoIncidencia(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { tipoIncidencia } = req.body;

      const repo = AppDataSource.getRepository(TipoIncidencia);
      const tipo = await repo.findOne({ where: { id: String(id) } });

      if (!tipo) {
        res.status(404).json({ message: "Tipo de incidencia no encontrado" });
        return;
      }

      tipo.tipoIncidencia = tipoIncidencia || tipo.tipoIncidencia;
      await repo.save(tipo);

      res.status(200).json({ message: "Tipo de incidencia actualizado", data: tipo });
    } catch (error) {
      console.error("Error al actualizar tipo de incidencia:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async deleteTipoIncidencia(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const repo = AppDataSource.getRepository(TipoIncidencia);
      const tipo = await repo.findOne({ where: { id: String(id) } });

      if (!tipo) {
        res.status(404).json({ message: "Tipo de incidencia no encontrado" });
        return;
      }

      await repo.remove(tipo);
      res.status(200).json({ message: "Tipo de incidencia eliminado" });
    } catch (error) {
      console.error("Error al eliminar tipo de incidencia:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
