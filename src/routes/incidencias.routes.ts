import { Router } from "express";
import { IncidenciasController } from "../controllers/incidencia.controller";

const router = Router();

router.post("/incidencias", IncidenciasController.crearIncidencia);
router.get("/incidencias", IncidenciasController.obtenerIncidencias);
router.get("/incidencias/:id", IncidenciasController.obtenerIncidenciaPorId);
router.delete("/incidencias/:id", IncidenciasController.eliminarIncidencia);

export default router;
