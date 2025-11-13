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

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export interface PatientEntryProps {
	entry: NonSensitivePatient;
}
