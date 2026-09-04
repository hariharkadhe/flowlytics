import express from 'express';
import { loginUser, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { loginSchema } from '../schemas/authSchemas';
import { loginLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.post('/login', loginLimiter, validate(loginSchema), loginUser);
router.get('/me', protect, getMe);

export default router;
