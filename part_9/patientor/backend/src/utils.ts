import { z } from 'zod';
import { Gender, type NewPatient, Occupation, type Patient } from './types';

export const NewPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.iso.date(),
	ssn: z.string().regex(/^\d{6}-\d{2,4}[A-Za-z0-9]$/),
	gender: z.enum(Gender),
	occupation: z.enum(Occupation),
	entries: z.array(z.unknown()),
});

export const toNewPatientEntry = (object: Patient): NewPatient => {
	return NewPatientSchema.parse(object);
};
