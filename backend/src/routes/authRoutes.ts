import express from 'express';
import { loginUser, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { loginSchema } from '../schemas/authSchemas';

const router = express.Router();

router.post('/login', validate(loginSchema), loginUser);
router.get('/me', protect, getMe);

export default router;
