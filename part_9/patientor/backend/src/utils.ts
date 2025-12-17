import { z } from 'zod';
import {
	type Entry,
	Gender,
	HealthCheckRating,
	type NewPatient,
	Occupation,
	type Patient,
} from './types';

export const IdSchema = z.uuid();

const DiagnoseEntrySchema = z.object({
	code: z.string(),
	name: z.string(),
	latin: z.string().optional(),
});

export type DiagnoseEntry = z.infer<typeof DiagnoseEntrySchema>;

const BaseEntrySchema = z
	.object({
		id: z.string(),
		description: z.string(),
		date: z.iso.date(),
		specialist: z.string(),
		diagnosisCodes: z.array(DiagnoseEntrySchema.shape.code).optional(),
	})
	.strict();

const HospitalEntrySchema = BaseEntrySchema.extend({
	type: z.literal('Hospital'),
	discharge: z
		.object({
			date: z.iso.date(),
			criteria: z.string(),
		})
		.strict(),
}).strict();

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
	type: z.literal('OccupationalHealthcare'),
	employerName: z.string(),
	sickLeave: z
		.object({
			startDate: z.iso.date(),
			endDate: z.iso.date(),
		})
		.strict()
		.optional(),
}).strict();

const HealthCheckEntrySchema = BaseEntrySchema.extend({
	type: z.literal('HealthCheck'),
	healthCheckRating: z.enum(HealthCheckRating),
}).strict();

export const EntrySchema = z.discriminatedUnion('type', [
	HospitalEntrySchema,
	OccupationalHealthcareEntrySchema,
	HealthCheckEntrySchema,
]);

export const NewEntrySchema = z.discriminatedUnion('type', [
	HealthCheckEntrySchema.omit({ id: true }),
	OccupationalHealthcareEntrySchema.omit({ id: true }),
	HospitalEntrySchema.omit({ id: true }),
]);

export const toNewEntry = (object: Entry): Entry => {
	return EntrySchema.parse(object);
};

export const NewPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.iso.date(),
	ssn: z.string().regex(/^\d{6}-\d{2,4}[A-Za-z0-9]$/),
	gender: z.enum(Gender),
	occupation: z.enum(Occupation),
	entries: z.array(EntrySchema),
});

export const toNewPatientEntry = (object: Patient): NewPatient => {
	return NewPatientSchema.parse(object);
};
