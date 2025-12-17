import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import type {
	Entry,
	Id,
	NewEntry,
	NewPatient,
	NonSensitivePatient,
	Patient,
} from '../types';

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

const addEntry = (patientId: Id, entry: NewEntry): Entry | undefined => {
	const newId = uuid();
	const patientFound = findById(patientId);

	if (!patientFound) {
		return undefined;
	}

	const newPatientEntry = {
		id: newId,
		...entry,
	} as Entry;

	patientFound.entries.push(newPatientEntry);

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
	addEntry,
	findById,
};
