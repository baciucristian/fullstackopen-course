import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import type { NewPatient, NonSensitivePatient, Patient } from '../types';

const getPatients = (): Patient[] => {
	return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
	return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (entry: NewPatient): NewPatient => {
	const id = uuid();
	const newPatientEntry = {
		id,
		...entry,
	};

	// patientData.push(newPatientEntry);

	return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
	const patientFound = patientData.find((patient) => patient.id === id);

	if (patientFound) {
		return patientFound;
	}

	return undefined;
};

export default {
	getPatients,
	getNonSensitiveEntries,
	addPatient,
	findById,
};
