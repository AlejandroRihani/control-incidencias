import { Router } from 'express';
import { TrabajadorController } from '../controllers/trabajador.controller';

const router = Router();
router.post('/', TrabajadorController.createTrabajador);
router.get('/', TrabajadorController.getTrabajadores);
router.get('/:id', TrabajadorController.getTrabajadorPorId);
router.put('/:id', TrabajadorController.updateTrabajador);
router.delete('/:id', TrabajadorController.deleteTrabajador);

export default router;
