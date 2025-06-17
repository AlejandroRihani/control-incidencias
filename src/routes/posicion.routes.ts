import { Router } from "express";
import { PosicionTrabajadorController } from "../controllers/posicion_trabajador.controller";

const router = Router();

router.post("/", PosicionTrabajadorController.createPosicion);
router.get("/", PosicionTrabajadorController.getPosiciones);
router.get("/:id", PosicionTrabajadorController.getPosicionById);
router.put("/:id", PosicionTrabajadorController.updatePosicion);
router.delete("/:id", PosicionTrabajadorController.deletePosicion);

export default router;
