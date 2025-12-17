"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientSchema.parse(req.body);
        console.log(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const newEntryParser = (req, _res, next) => {
    try {
        utils_1.NewEntrySchema.parse(req.body);
        utils_1.IdSchema.parse(req.params.id);
        console.log(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof SyntaxError && 'body' in error) {
        res.status(400).send({ error: 'Invalid JSON format' });
    }
    if (error instanceof zod_1.z.ZodError) {
        const prettyError = zod_1.z.prettifyError(error);
        res.status(400).send({ error: prettyError });
    }
    next(error);
};
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', newPatientParser, (req, res) => {
    const addedPatient = patientService_1.default.addPatient(req.body);
    res.json(addedPatient);
});
router.post('/:id/entries', newEntryParser, (req, res) => {
    const addedEntry = patientService_1.default.addEntry(req.params.id, req.body);
    if (addedEntry) {
        res.json(addedEntry);
    }
    else {
        res.sendStatus(404);
    }
});
router.use(errorMiddleware);
exports.default = router;
