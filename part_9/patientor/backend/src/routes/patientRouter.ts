import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';

import { z } from 'zod';

import patientService from '../services/patientService';

import type { NewPatient, NonSensitivePatient, Patient } from '../types';

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

const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res: Response<Patient>) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.post(
	'/',
	newPatientParser,
	(req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
		const addedPatient = patientService.addPatient(req.body);
		res.json(addedPatient);
	},
);

router.use(errorMiddleware);

export default router;
