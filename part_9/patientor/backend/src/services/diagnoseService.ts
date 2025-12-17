import diagnoseData from '../../data/diagnoses';
import type { DiagnoseEntry } from '../utils';

const getDiagnoses = (): DiagnoseEntry[] => {
	return diagnoseData;
};

export default {
	getDiagnoses,
};
