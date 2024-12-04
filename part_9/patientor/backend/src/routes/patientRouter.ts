import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body);
		console.log(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
	const addedPatient = patientService.addPatient(req.body);
	res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
