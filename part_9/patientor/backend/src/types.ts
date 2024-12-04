import { z } from 'zod';
import { NewPatientSchema } from './utils';

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

export interface DiagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}
export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: Occupation;
}

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
