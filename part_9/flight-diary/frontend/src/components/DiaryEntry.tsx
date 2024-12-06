import { DiaryEntryProps } from '../types';

const DiaryEntry = ({ entry }: DiaryEntryProps): JSX.Element => {
	return (
		<p>
			<strong>{entry.date}</strong>
			<br /> <br />
			<span>visibility: {entry.visibility}</span>
			<br />
			<span>weather: {entry.weather}</span>
			<br />
			<span>comment: {entry.comment}</span>
		</p>
	);
};

export default DiaryEntry;
