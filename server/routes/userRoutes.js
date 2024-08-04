import { Router } from 'express';
import { currentUser, loginUser, registerUser } from '../controllers/userController.js';
import validateTokenHandler from '../middleware/validateTokenHandler.js';

const router = Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/current').get(validateTokenHandler, currentUser);

export default router;