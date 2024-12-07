import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';

interface DiaryContextType {
	diaryEntries: [DiaryEntry[], Dispatch<SetStateAction<DiaryEntry[]>>];
	newDiaryEntry: [NewDiaryEntry, Dispatch<SetStateAction<NewDiaryEntry>>];
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
	const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>({
		date: '',
		weather: '',
		visibility: '',
		comment: '',
	});

	const contextValue: DiaryContextType = {
		diaryEntries: [diaryEntries, setDiaryEntries],
		newDiaryEntry: [newDiaryEntry, setNewDiaryEntry],
	};

	return <DiaryContext.Provider value={contextValue}>{children}</DiaryContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDiaryContext = () => {
	const context = useContext(DiaryContext);
	if (context === undefined) {
		throw new Error('useDiaryContext must be used within a DiaryContextProvider');
	}
	return context;
};

export default DiaryContext;
