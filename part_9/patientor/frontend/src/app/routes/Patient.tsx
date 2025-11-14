import { House, Mars, Venus } from 'lucide-react';
import { type JSX, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import PatientDiagnose from '@/components/PatientDiagnose';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/services/patients';
import type { Patient as PatientType } from '@/types/types';

type PatientParams = {
	patientId: string;
};

const Patient = (): JSX.Element => {
	const [patientEntry, setPatientEntry] = useState<PatientType>();
	const { patientId } = useParams<PatientParams>();

	useEffect(() => {
		if (!patientId) return;
		api.getById(patientId).then((data) => {
			setPatientEntry(data);
		});
	}, [patientId]);

	console.log(patientEntry);

	if (!patientEntry) {
		return <div>Loading...</div>;
	}

	const names: string[] = patientEntry.name.split(' ');

	return (
		<Card className="mx-auto max-w-[400px]">
			<CardHeader className="text-center">
				<CardTitle className="text-xl">Patient</CardTitle>
			</CardHeader>
			<CardContent>
				<Link to="/">
					<Button variant="secondary" className="w-full">
						<House /> Home
					</Button>
				</Link>

				<div className="p-3">
					<div className="grid gap-1">
						<p className="font-medium text-lg">{patientEntry.name}</p>
						<p className="text-muted-foreground text-sm">
							SSN: {patientEntry.ssn}
						</p>
						<p className="text-muted-foreground text-sm">
							Occupation: {patientEntry.occupation}
						</p>
						<p className="text-muted-foreground text-sm">
							Sex:{' '}
							{patientEntry.gender === 'male' ? (
								<Mars className="inline h-4 w-4" />
							) : (
								<Venus className="inline h-4 w-4" />
							)}
						</p>

						<div>
							<p className="mt-4 font-medium text-lg">Entries</p>
							<div className="space-y-2">
								{patientEntry.entries.map((patientEntry) => {
									return (
										<div key={patientEntry.id} className="space-y-2">
											<p className="text-muted-foreground text-sm">
												{patientEntry.date} {patientEntry.description}
											</p>
											<div className="space-y-2">
												{patientEntry.diagnosisCodes?.map((code) => {
													return <PatientDiagnose code={code} key={code} />;
												})}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Patient;
