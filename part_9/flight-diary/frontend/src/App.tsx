import { useEffect, useState } from 'react';
import DiaryEntries from './components/DiaryEntries';
import { DiaryEntry } from './types';
import { getAllEntries } from './services/diaryService';

const App = () => {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getAllEntries().then((data) => {
			setDiaryEntries(data);
		});
	}, []);

	return (
		<>
			<DiaryEntries entries={diaryEntries} />
		</>
	);
};

export default App;
