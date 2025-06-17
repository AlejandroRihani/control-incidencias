import { Router } from "express";
import { NivelTrabajadorController } from "../controllers/nivel_trabajador.controller";

const router = Router();

router.post("/", NivelTrabajadorController.createNivel);
router.get("/", NivelTrabajadorController.getNiveles);
router.get("/:id", NivelTrabajadorController.getNivelById);
router.put("/:id", NivelTrabajadorController.updateNivel);
router.delete("/:id", NivelTrabajadorController.deleteNivel);

export default router;
