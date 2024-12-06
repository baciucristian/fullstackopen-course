export enum Weather {
	Rainy = 'rainy',
	Sunny = 'sunny',
	Windy = 'windy',
	Cloudy = 'cloudy',
}

export enum Visibility {
	Good = 'good',
	Poor = 'poor',
}

export interface DiaryEntry {
	weather: Weather;
	visibility: Visibility;
	date: string;
	comment: string;
	id: number;
}

export interface DiaryEntriesProps {
	entries: DiaryEntry[];
}

export interface DiaryEntryProps {
	entry: DiaryEntry;
}
