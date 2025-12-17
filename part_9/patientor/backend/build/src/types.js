"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRating = exports.Occupation = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var Occupation;
(function (Occupation) {
    Occupation["Cop"] = "Cop";
    Occupation["NewYorkCityCop"] = "New york city cop";
    Occupation["ForensicPathologist"] = "Forensic Pathologist";
    Occupation["DigitalEvangelist"] = "Digital evangelist";
    Occupation["Technician"] = "Technician";
    Occupation["Other"] = "Other";
})(Occupation || (exports.Occupation = Occupation = {}));
// interface BaseEntry {
// 	id: string;
// 	description: string;
// 	date: string;
// 	specialist: string;
// 	diagnosisCodes?: Array<DiagnoseEntry['code']>;
// }
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating || (exports.HealthCheckRating = HealthCheckRating = {}));
