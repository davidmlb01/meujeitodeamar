/**
 * API Routes
 */

import { Router } from 'express';
import leadsScoreRouter from './leads/score';

const router = Router();

router.use('/api/leads/score', leadsScoreRouter);

export default router;
