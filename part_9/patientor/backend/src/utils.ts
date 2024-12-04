import { Gender, Occupation, NewPatientEntry } from './types';
import { z } from 'zod';

export const NewPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.string().date(),
	ssn: z.string().regex(/^\d{6}-\d{2,4}[A-Za-z0-9]$/),
	gender: z.nativeEnum(Gender),
	occupation: z.nativeEnum(Occupation),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	return NewPatientSchema.parse(object);
};
