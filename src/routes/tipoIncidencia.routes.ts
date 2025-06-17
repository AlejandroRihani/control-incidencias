import { Router } from 'express';
import { TipoIncidenciaController } from '../controllers/tipo_incidencia.controller';
const router = Router();

router.post('/', TipoIncidenciaController.createTipoIncidencia);
router.get('/', TipoIncidenciaController.getTiposIncidencia);
router.get('/:id', TipoIncidenciaController.getTipoIncidenciaPorId);
router.put('/:id', TipoIncidenciaController.updateTipoIncidencia);
router.delete('/:id', TipoIncidenciaController.deleteTipoIncidencia);

export default router;
