import type { Response } from 'express';
import express from 'express';
import diagnoseService from '../services/diagnoseService';
import type { DiagnoseEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnoseEntry[]>) => {
	res.send(diagnoseService.getDiagnoses());
});

export default router;
