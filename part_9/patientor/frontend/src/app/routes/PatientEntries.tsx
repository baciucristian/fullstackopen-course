import { type JSX, useEffect, useState } from 'react';
import { Link } from 'react-router';
import PatientEntry from '@/components/PatientEntry';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/services/patients';
import type { NonSensitivePatient } from '@/types/types';

const PatientEntries = (): JSX.Element => {
	const [patientEntries, setPatientEntries] = useState<NonSensitivePatient[]>(
		[],
	);

	useEffect(() => {
		api.getAll().then((data) => {
			console.log(data);
			setPatientEntries(data);
		});
	}, []);

	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle className="text-xl">Patient entries</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-5">
				{patientEntries.map((entry) => {
					return (
						<Link
							style={{ textDecoration: 'none', color: 'inherit' }}
							to={`/patient/${entry.id}`}
							key={entry.id}
						>
							<PatientEntry key={entry.id} entry={entry} />
						</Link>
					);
				})}
			</CardContent>
		</Card>
	);
};

export default PatientEntries;
