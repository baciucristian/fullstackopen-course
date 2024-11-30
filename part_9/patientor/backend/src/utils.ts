import { Gender, Occupation, NewPatientEntry } from './types';

const isString = (value: unknown): value is string => {
	return typeof value === 'string';
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error('Incorrect name: ' + String(name));
	}

	return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
		throw new Error('Incorrect date of birth: ' + String(dateOfBirth));
	}

	return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
	if (!isString(ssn) || !ssn.match(/^\d{6}-\d{2,4}[A-Za-z0-9]$/)) {
		throw new Error('Incorrect ssn: ' + String(ssn));
	}

	return ssn;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect gender: ' + String(gender));
	}

	return gender;
};

const isOccupation = (param: string): param is Occupation => {
	return Object.values(Occupation)
		.map((v) => v.toString())
		.includes(param);
};

const parseOccupation = (occupation: unknown): Occupation => {
	if (!isString(occupation) || !isOccupation(occupation)) {
		throw new Error('Incorrect occupation: ' + String(occupation));
	}

	return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
		const newEntry: NewPatientEntry = {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			ssn: parseSSN(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
		};

		return newEntry;
	}

	throw new Error('Incorrect data: some fields are missing');
};
