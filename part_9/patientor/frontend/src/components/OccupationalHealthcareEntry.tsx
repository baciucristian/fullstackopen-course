import { SquareActivity } from 'lucide-react';
import type { JSX } from 'react';
import type { OccupationalHealthcareEntry as OccupationalHealthcareType } from '@/types/types';
import PatientDiagnose from './PatientDiagnose';

type OccupationalHealthcareProps = {
	entry: OccupationalHealthcareType;
};

const OccupationalHealthcareEntry = ({
	entry,
}: OccupationalHealthcareProps): JSX.Element => {
	return (
		<div className="space-y-2 rounded-md border border-border p-4">
			<div className="text-muted-foreground text-sm">
				<p>
					{entry.date} <SquareActivity className="inline-block text-red-600" />{' '}
					{entry.employerName}
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

export default OccupationalHealthcareEntry;
