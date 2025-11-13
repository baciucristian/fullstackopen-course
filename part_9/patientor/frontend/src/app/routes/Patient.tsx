import { House, Mars, Venus } from 'lucide-react';
import { type JSX, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
	const initials: string = names[0].charAt(0) + names[1].charAt(0);

	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle className="text-xl">Patient</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<Link to="/" className="w-full">
					<Button variant="default" className="w-full">
						<House /> Home
					</Button>
				</Link>

				<div className="flex items-center gap-4 rounded-lg p-3 hover:cursor-pointer hover:bg-gray-100">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="font-medium text-lg leading-none">
							{patientEntry.name}
						</p>
						<p className="text-muted-foreground text-sm">
							SSN: {patientEntry.ssn}
						</p>
						<p className="text-muted-foreground text-sm">
							Occupation: {patientEntry.occupation}
						</p>
					</div>
					<div className="ml-auto font-medium">
						{patientEntry.gender === 'male' ? <Mars /> : <Venus />}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Patient;
