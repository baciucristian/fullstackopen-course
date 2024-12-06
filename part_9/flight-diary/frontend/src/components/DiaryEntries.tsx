import { DiaryEntriesProps } from '../types';
import DiaryEntry from './DiaryEntry';

const DiaryEntries = ({ entries }: DiaryEntriesProps): JSX.Element => {
	return (
		<>
			<h2>Diary entries</h2>
			{entries.map((entry) => {
				return <DiaryEntry key={entry.id} entry={entry} />;
			})}
		</>
	);
};

export default DiaryEntries;
