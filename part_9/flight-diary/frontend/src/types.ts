export enum Weather {
	Rainy = 'rainy',
	Sunny = 'sunny',
	Windy = 'windy',
	Cloudy = 'cloudy',
}

export enum Visibility {
	Good = 'good',
	Ok = 'ok',
	Poor = 'poor',
}

export interface DiaryEntry {
	weather: Weather | '';
	visibility: Visibility | '';
	date: string;
	comment: string;
	id: number;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface DiaryEntriesProps {
	entries: DiaryEntry[];
}

export interface DiaryEntryProps {
	entry: DiaryEntry;
}

export interface NotificationProps {
	message: string | null;
	color: 'red' | 'green' | null;
}
