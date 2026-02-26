import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createIdea, getUserIdeas, getIdeaById, updateIdea } from '../controllers/ideaController.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createIdea);
router.get('/', getUserIdeas);
router.get('/:id', getIdeaById);
router.put('/:id', updateIdea);

export default router;

