import express from 'express';
import petRouter from './pet.router';

const router = express.Router();

router.use('/pets', petRouter);

export default router;
