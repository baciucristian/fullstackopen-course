import diagnoseData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getDiagnoses = (): DiagnoseEntry[] => {
	return diagnoseData;
};

export default {
	getDiagnoses,
};
