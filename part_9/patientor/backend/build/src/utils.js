"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = exports.NewPatientSchema = exports.toNewEntry = exports.NewEntrySchema = exports.EntrySchema = exports.IdSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
exports.IdSchema = zod_1.z.uuid();
// Same as in types.ts but using zod schemas (i know this is duplicated code)
// TODO: add types
const DiagnoseEntrySchema = zod_1.z.object({
    code: zod_1.z.string(),
    name: zod_1.z.string(),
    latin: zod_1.z.string().optional(),
});
const BaseEntrySchema = zod_1.z.object({
    id: zod_1.z.string(),
    description: zod_1.z.string(),
    date: zod_1.z.iso.date(),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(DiagnoseEntrySchema.shape.code).optional(),
});
const HospitalEntrySchema = BaseEntrySchema.extend({
    type: zod_1.z.literal('Hospital'),
    discharge: zod_1.z.object({
        date: zod_1.z.iso.date(),
        criteria: zod_1.z.string(),
    }),
});
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: zod_1.z.literal('OccupationalHealthcare'),
    employerName: zod_1.z.string(),
    sickLeave: zod_1.z
        .object({
        startDate: zod_1.z.iso.date(),
        endDate: zod_1.z.iso.date(),
    })
        .optional(),
});
const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: zod_1.z.literal('HealthCheck'),
    healthCheckRating: zod_1.z.enum(types_1.HealthCheckRating),
});
exports.EntrySchema = zod_1.z.discriminatedUnion('type', [
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
    HealthCheckEntrySchema,
]);
exports.NewEntrySchema = zod_1.z.discriminatedUnion('type', [
    HealthCheckEntrySchema.omit({ id: true }),
    OccupationalHealthcareEntrySchema.omit({ id: true }),
    HospitalEntrySchema.omit({ id: true }),
]);
const toNewEntry = (object) => {
    return exports.EntrySchema.parse(object);
};
exports.toNewEntry = toNewEntry;
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.iso.date(),
    ssn: zod_1.z.string().regex(/^\d{6}-\d{2,4}[A-Za-z0-9]$/),
    gender: zod_1.z.enum(types_1.Gender),
    occupation: zod_1.z.enum(types_1.Occupation),
    entries: zod_1.z.array(exports.EntrySchema),
});
const toNewPatientEntry = (object) => {
    return exports.NewPatientSchema.parse(object);
};
exports.toNewPatientEntry = toNewPatientEntry;
