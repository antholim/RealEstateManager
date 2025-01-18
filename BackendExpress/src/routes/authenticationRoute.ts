import express from 'express';
import UserController from '../controllers/userController';
const router = express.Router();

router.post('/register', UserController.registerController())
router.post('/login', UserController.loginController())

export default router;
