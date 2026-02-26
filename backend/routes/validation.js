import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createSprint,
  getSprint,
  getUserSprints,
  updateDayStatus,
  uploadProof,
  updateObjections
} from '../controllers/validationController.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createSprint);
router.get('/', getUserSprints);
router.get('/:ideaId', getSprint);
router.put('/:ideaId/day', updateDayStatus);
router.post('/:ideaId/proof', uploadProof);
router.put('/:ideaId/objections', updateObjections);

export default router;

