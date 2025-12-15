import { Hospital } from 'lucide-react';
import type { JSX } from 'react';
import type { HospitalEntry as HospitalEntryType } from '@/types/types';
import PatientDiagnose from './PatientDiagnose';

type HospitalEntryProps = {
	entry: HospitalEntryType;
};

const HospitalEntry = ({ entry }: HospitalEntryProps): JSX.Element => {
	return (
		<div className="space-y-2 rounded-md border border-border p-4">
			<div className="text-muted-foreground text-sm">
				<p>
					{entry.date} <Hospital className="inline-block text-red-600" />
				</p>
				<p className="italic">{entry.description}</p>
			</div>
			<div className="space-y-2">
				{entry.diagnosisCodes?.map((code) => {
					return <PatientDiagnose code={code} key={code} />;
				})}
			</div>
			<p className="text-muted-foreground text-sm">
				diagnose by {entry.specialist}
			</p>
		</div>
	);
};

export default HospitalEntry;
