import { Router } from 'express';
import { SnippetController } from './snippet.controller';

const router = Router();
const controller = new SnippetController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;