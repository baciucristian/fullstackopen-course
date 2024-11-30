import express from 'express';

import { Response } from 'express';
import { NonSensitivePatientEntry } from '../types';

import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res: Response) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);
		const addedEntry = patientService.addPatient(newPatientEntry);

		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong :(';
		if (error instanceof Error) {
			errorMessage = 'Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
