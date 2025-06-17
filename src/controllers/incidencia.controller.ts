import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { IncidenciasTrabajador } from "../entity/IncidenciasTrabajador.entity";
import { IncidenciaService } from "../services/incidencias.service";
import { checarResetVacacionesSiEsNecesario } from "../utils/resetIncidencias.auto";


export class IncidenciasController {
  static async crearIncidencia(req: Request, res: Response): Promise<void> {
    try {
      checarResetVacacionesSiEsNecesario(); // Verifica si es necesario hacer el reset de vacaciones
      
      const { trabajadorId, tipoIncidencia, fechaInicio, fechaFin, forzarGuardado } = req.body;

      if (!trabajadorId || !tipoIncidencia || !fechaInicio || !fechaFin) {
        res.status(400).json({ message: 'Faltan campos obligatorios' });
        return;
      }

      const incidencia = await IncidenciaService.registrarVacacion(
        {
          trabajadorId,
          tipoIncidencia,
          fechaInicio,
          fechaFin,
        },
        forzarGuardado === true // asegura que sea booleano
      );

      res.status(201).json({
        message: 'Incidencia creada correctamente',
        incidencia,
      });
    } catch (error: any) {
      console.error('Error al crear incidencia:', error);

      const status = error.status || 500;
      const response: any = { message: error.message || 'Error interno del servidor' };

      if (error.detalles) response.detalles = error.detalles;
      if (error.advertencias) response.advertencias = error.advertencias;

      res.status(status).json(response);
    }
  }

  static async obtenerIncidencias(req: Request, res: Response): Promise<void> {
    try {
      const incidenciaRepo = AppDataSource.getRepository(IncidenciasTrabajador);
      const incidencias = await incidenciaRepo.find({
        relations: ["trabajador"], // para incluir info del trabajador
      });

      res.status(200).json({ incidencias });
      return;
    } catch (error) {
      console.error("Error al obtener incidencias:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
  }

  static async obtenerIncidenciaPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const incidenciaRepo = AppDataSource.getRepository(IncidenciasTrabajador);
      const incidencia = await incidenciaRepo.findOne({
        where: { id },
        relations: ["trabajador", "tipoIncidencia"],
      });

      if (!incidencia) {
        res.status(404).json({ message: "Incidencia no encontrada" });
        return;
      }

      res.status(200).json({ incidencia });
    } catch (error) {
      console.error("Error al obtener incidencia:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }


  static async eliminarIncidencia(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const incidenciaRepo = AppDataSource.getRepository(IncidenciasTrabajador);
      const incidencia = await incidenciaRepo.findOne({ where: { id } });

      if (!incidencia) {
        res.status(404).json({ message: "Incidencia no encontrada" });
        return;
      }

      await incidenciaRepo.remove(incidencia);

      res.status(200).json({ message: "Incidencia eliminada correctamente" });
      return;
    } catch (error) {
      console.error("Error al eliminar incidencia:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
  }
}
