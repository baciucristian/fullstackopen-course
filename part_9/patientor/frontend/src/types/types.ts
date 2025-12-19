import z from 'zod';

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export enum Occupation {
	Cop = 'Cop',
	NewYorkCityCop = 'New york city cop',
	ForensicPathologist = 'Forensic Pathologist',
	DigitalEvangelist = 'Digital evangelist',
	Technician = 'Technician',
	Other = 'Other',
}

export enum HealthCheckRating {
	Healthy = 0,
	LowRisk = 1,
	HighRisk = 2,
	CriticalRisk = 3,
}

export const IdSchema = z.uuid();

const DiagnoseEntrySchema = z.object({
	code: z.string(),
	name: z.string(),
	latin: z.string().optional(),
});

export type DiagnoseEntry = z.infer<typeof DiagnoseEntrySchema>;

const BaseEntrySchema = z.strictObject({
	id: z.string(),
	description: z.string().min(1, 'Description is required'),
	date: z.iso.date(),
	specialist: z.string().min(1, 'Specialist is required'),
	diagnosisCodes: z.array(DiagnoseEntrySchema.shape.code).optional(),
});

const HospitalEntrySchema = z.strictObject({
	...BaseEntrySchema.shape,
	type: z.literal('Hospital'),
	discharge: z.strictObject({
		date: z.iso.date(),
		criteria: z.string().min(1, 'Discharge criteria is required'),
	}),
});

const OccupationalHealthcareEntrySchema = z.strictObject({
	...BaseEntrySchema.shape,
	type: z.literal('OccupationalHealthcare'),
	employerName: z.string().min(1, 'Employer name is required'),
	sickLeave: z
		.strictObject({
			startDate: z.iso.date(),
			endDate: z.iso.date(),
		})
		.optional(),
});

const HealthCheckEntrySchema = z.strictObject({
	...BaseEntrySchema.shape,
	type: z.literal('HealthCheck'),
	healthCheckRating: z.enum(HealthCheckRating),
});

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

export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<
	typeof OccupationalHealthcareEntrySchema
>;
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export interface PatientEntryProps {
	entry: NonSensitivePatient;
}

export interface PatientDiagnoseProps {
	code: DiagnoseEntry['code'];
}
