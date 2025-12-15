import type { Entry } from '@/types/types';
import assertNever from '@/utils/helper';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

type EntryDetailsProps = {
	entry: Entry;
};

const EntryDetails = ({ entry }: EntryDetailsProps) => {
	switch (entry.type) {
		case 'Hospital':
			return <HospitalEntry entry={entry} />;
		case 'OccupationalHealthcare':
			return <OccupationalHealthcareEntry entry={entry} />;
		case 'HealthCheck':
			return <HealthCheckEntry entry={entry} />;
		default: {
			assertNever(entry);
		}
	}
};

export default EntryDetails;
