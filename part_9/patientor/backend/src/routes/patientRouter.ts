import { Response } from 'express';
import { NonSensitivePatientEntry } from '../types';
import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res: Response) => {
	try {
		const newPatientEntry = patientService.addPatient(req.body);
		res.json(newPatientEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong :(';
		if (error instanceof Error) {
			errorMessage = 'Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
