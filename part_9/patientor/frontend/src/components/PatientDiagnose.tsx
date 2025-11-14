import type { JSX } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import type { PatientDiagnoseProps } from '@/types/types';

const PatientDiagnose = ({ code }: PatientDiagnoseProps): JSX.Element => {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>{code}</AccordionTrigger>
				{/* <AccordionContent></AccordionContent> */}
			</AccordionItem>
		</Accordion>
	);
};

export default PatientDiagnose;
