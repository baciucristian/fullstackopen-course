import { Response } from 'express';
import { DiagnoseEntry } from '../types';
import express from 'express';

import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnoseEntry[]>) => {
	res.send(diagnoseService.getDiagnoses());
});

export default router;
