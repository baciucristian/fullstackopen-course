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
			{entry.comment && (
				<span>
					<span>comment: {entry.comment}</span>
				</span>
			)}
		</p>
	);
};

export default DiaryEntry;
