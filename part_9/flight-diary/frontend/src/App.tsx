import DiaryAddEntry from './components/DiaryAddEntry';
import DiaryEntries from './components/DiaryEntries';
import { DiaryContextProvider } from './DiaryContext';

const App = () => {
	return (
		<DiaryContextProvider>
			<DiaryAddEntry />
			<DiaryEntries />
		</DiaryContextProvider>
	);
};

export default App;
