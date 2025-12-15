import { Heart, SquareActivity } from 'lucide-react';
import type { JSX } from 'react';
import {
	HealthCheckRating,
	type HealthCheckEntry as HealthCheckType,
} from '@/types/types';
import PatientDiagnose from './PatientDiagnose';

type HealthCheckProps = {
	entry: HealthCheckType;
};

type HealthColor = 'green' | 'yellow' | 'orange' | 'red';

const healthCheckRatingColorMap: Record<HealthCheckRating, HealthColor> = {
	[HealthCheckRating.Healthy]: 'green',
	[HealthCheckRating.LowRisk]: 'yellow',
	[HealthCheckRating.HighRisk]: 'orange',
	[HealthCheckRating.CriticalRisk]: 'red',
};

const HealthCheckEntry = ({ entry }: HealthCheckProps): JSX.Element => {
	const heartColor: HealthColor =
		healthCheckRatingColorMap[entry.healthCheckRating];

	return (
		<div className="space-y-2 rounded-md border border-border p-4">
			<div className="text-muted-foreground text-sm">
				<p>
					{entry.date} <SquareActivity className="inline-block text-red-600" />
				</p>
				<p className="italic">{entry.description}</p>
			</div>
			<div className="space-y-2">
				{entry.diagnosisCodes?.map((code) => {
					return <PatientDiagnose code={code} key={code} />;
				})}
			</div>
			<Heart fill={heartColor} />
			<p className="text-muted-foreground text-sm">
				diagnose by {entry.specialist}
			</p>
		</div>
	);
};

export default HealthCheckEntry;
