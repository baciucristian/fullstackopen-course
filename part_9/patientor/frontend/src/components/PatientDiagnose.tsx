import { type JSX, useEffect, useState } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import apiDiagnoses from '@/services/diagnoses';
import type { DiagnoseEntry, PatientDiagnoseProps } from '@/types/types';

const PatientDiagnose = ({ code }: PatientDiagnoseProps): JSX.Element => {
	const [diagnose, setDiagnose] = useState<DiagnoseEntry>();

	useEffect(() => {
		apiDiagnoses.getByCode(code).then((data) => {
			// console.log(data);
			setDiagnose(data);
		});
	}, [code]);

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>{code}</AccordionTrigger>
				<AccordionContent className="mt-3">{diagnose?.name}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default PatientDiagnose;
