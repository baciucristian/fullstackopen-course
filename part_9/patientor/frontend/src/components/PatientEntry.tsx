import { Mars, Venus } from 'lucide-react';
import type { JSX } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { PatientEntryProps } from '@/types/types';

const PatientEntry = ({ entry }: PatientEntryProps): JSX.Element => {
	const names: string[] = entry.name.split(' ');
	const initials: string = names[0].charAt(0) + names[1].charAt(0);

	return (
		<div className="flex items-center gap-4 rounded-lg p-3 hover:cursor-pointer hover:bg-gray-100">
			<Avatar className="hidden h-9 w-9 sm:flex">
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div className="grid gap-1">
				<p className="font-medium text-sm leading-none">{entry.name}</p>
				<p className="text-muted-foreground text-sm">{entry.occupation}</p>
			</div>
			<div className="ml-auto font-medium">
				{entry.gender === 'male' ? <Mars /> : <Venus />}
			</div>
		</div>
	);
};

export default PatientEntry;
