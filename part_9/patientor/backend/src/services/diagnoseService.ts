import diagnoseData from '../../data/diagnoses';
import type { DiagnoseEntry } from '../types';

const getDiagnoses = (): DiagnoseEntry[] => {
	return diagnoseData;
};

export default {
	getDiagnoses,
};
