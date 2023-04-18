import { Router } from 'express';
import userRoutes from './user.routes.js'
import gameRoutes from './game.routes.js';
import reviewRouter from './review.routes.js';

const router = Router();

router.use('/users', userRoutes)
router.use('/games', gameRoutes)
router.use('/reviews', reviewRouter)

export default router;