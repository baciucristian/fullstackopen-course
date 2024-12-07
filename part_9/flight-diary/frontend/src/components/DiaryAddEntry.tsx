import { createEntry } from '../services/diaryService';
import { useDiaryContext } from '../DiaryContext';
import { Visibility, Weather } from '../types';

const DiaryAddEntry = (): JSX.Element => {
	const context = useDiaryContext();
	const [diaryEntries, setDiaryEntries] = context.diaryEntries;
	const [newDiaryEntry, setNewDiaryEntry] = context.newDiaryEntry;

	const diaryEntryCreation = (event: React.SyntheticEvent) => {
		event.preventDefault();

		createEntry(newDiaryEntry).then((data) => {
			setDiaryEntries(diaryEntries.concat(data));
		});

		setNewDiaryEntry({ date: '', visibility: '', weather: '', comment: '' });
	};

	return (
		<>
			<h2>Add new entry </h2>
			<form onSubmit={diaryEntryCreation}>
				date{' '}
				<input
					value={newDiaryEntry.date}
					onChange={(e) => setNewDiaryEntry({ ...newDiaryEntry, date: e.target.value })}
				/>
				<br />
				visibility{' '}
				<input
					value={newDiaryEntry.visibility}
					onChange={(e) => setNewDiaryEntry({ ...newDiaryEntry, visibility: e.target.value as Visibility | '' })}
				/>
				<br />
				weather{' '}
				<input
					value={newDiaryEntry.weather}
					onChange={(e) => setNewDiaryEntry({ ...newDiaryEntry, weather: e.target.value as Weather | '' })}
				/>
				<br />
				comment{' '}
				<input
					value={newDiaryEntry.comment}
					onChange={(e) => setNewDiaryEntry({ ...newDiaryEntry, comment: e.target.value })}
				/>
				<br />
				<button type="submit">add</button>
			</form>
		</>
	);
};

export default DiaryAddEntry;
