import { House, Mars, Venus } from 'lucide-react';
import { type JSX, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import EntryDetails from '@/components/EntryDetails';
import PatientForm from '@/components/PatientForm';
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

	return (
		<div>
			<Card className="h-fit w-full max-w-2xl shadow-lg">
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

							<PatientForm
								patientId={patientEntry.id}
								setPatientEntry={setPatientEntry}
							/>

							<div>
								<p className="mt-4 font-medium text-lg">Entries</p>
								<div className="space-y-2">
									{patientEntry.entries.map((patientEntry) => {
										return (
											<EntryDetails
												entry={patientEntry}
												key={patientEntry.id}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Patient;
