import { useEffect } from 'react';
import { getAllEntries } from '../services/diaryService';
import DiaryEntry from './DiaryEntry';
import { useDiaryContext } from '../DiaryContext';

const DiaryEntries = (): JSX.Element => {
	const context = useDiaryContext();
	const [diaryEntries, setDiaryEntries] = context.diaryEntries;

	useEffect(() => {
		getAllEntries().then((data) => {
			setDiaryEntries(data);
		});
	}, [setDiaryEntries]);

	return (
		<>
			<h2>Diary entries</h2>
			{diaryEntries.map((entry) => {
				return <DiaryEntry key={entry.id} entry={entry} />;
			})}
		</>
	);
};

export default DiaryEntries;
