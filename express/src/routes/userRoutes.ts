import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/', authMiddleware, userController.getAll.bind(userController));
router.get('/:id', authMiddleware, userController.getById.bind(userController));
router.put('/:id', authMiddleware, userController.update.bind(userController));
router.delete('/:id', authMiddleware, userController.delete.bind(userController));

export default router;