import patientData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, Patient, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[] => {
	return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
	const id = uuid();
	const newPatientEntry = {
		id,
		...entry,
	};

	patientData.push(newPatientEntry);

	return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
	const patientFound = patientData.find((patient) => patient.id === id);

	if (patientFound) {
		return {
			...patientFound,
			entries: [],
		};
	}

	return undefined;
};

export default {
	getPatients,
	getNonSensitiveEntries,
	addPatient,
	findById,
};
