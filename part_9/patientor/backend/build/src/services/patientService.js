"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatientEntry = Object.assign({ id }, entry);
    // patientData.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (patientId, entry) => {
    const newId = (0, uuid_1.v1)();
    const patientFound = findById(patientId);
    if (!patientFound) {
        return undefined;
    }
    const newPatientEntry = Object.assign({ id: newId }, entry);
    patientFound.entries.push(newPatientEntry);
    return newPatientEntry;
};
const findById = (id) => {
    const patientFound = patients_1.default.find((patient) => patient.id === id);
    if (patientFound) {
        return patientFound;
    }
    return undefined;
};
exports.default = {
    getPatients,
    getNonSensitiveEntries,
    addPatient,
    addEntry,
    findById,
};
