import { Router } from "express";
import { HorarioTrabajadorController } from "../controllers/horario_trabajador.controller";

const router = Router();

router.post("/", HorarioTrabajadorController.createHorario);
router.get("/", HorarioTrabajadorController.getHorarios);
router.get("/:id", HorarioTrabajadorController.getHorarioById);
router.put("/:id", HorarioTrabajadorController.updateHorario);
router.delete("/:id", HorarioTrabajadorController.deleteHorario);

export default router;
