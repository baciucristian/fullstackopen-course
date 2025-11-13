import type { z } from 'zod';
import type { NewPatientSchema } from './utils';

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

// export interface PatientEntry {
// 	id: string;
// 	name: string;
// 	dateOfBirth: string;
// 	ssn: string;
// 	gender: Gender;
// 	occupation: Occupation;
// }

// export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
	Healthy = 0,
	LowRisk = 1,
	HighRisk = 2,
	CriticalRisk = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: {
		date: string;
		criteria: string;
	};
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

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
