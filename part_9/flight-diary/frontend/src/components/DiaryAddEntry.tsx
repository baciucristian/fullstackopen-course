import { createEntry } from '../services/diaryService';
import { useDiaryContext } from '../DiaryContext';
import { NotificationProps, Visibility, Weather } from '../types';
import Notification from './Notification';
import { useState } from 'react';

const DiaryAddEntry = (): JSX.Element => {
	const context = useDiaryContext();
	const [diaryEntries, setDiaryEntries] = context.diaryEntries;
	const [newDiaryEntry, setNewDiaryEntry] = context.newDiaryEntry;

	const [notificationProps, setNotificationProps] = useState<NotificationProps>({ color: null, message: null });

	const diaryEntryCreation = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const newDiaryEntryResponse = await createEntry(newDiaryEntry);
		console.log(newDiaryEntryResponse);

		if (newDiaryEntryResponse) {
			if ('errorMessage' in newDiaryEntryResponse) {
				setNotificationProps({
					color: 'red',
					message: newDiaryEntryResponse.errorMessage || null,
				});

				setTimeout(() => {
					setNotificationProps({ color: null, message: null });
				}, 5000);

				return;
			}

			setDiaryEntries(diaryEntries.concat(newDiaryEntryResponse));
		}

		setNewDiaryEntry({
			date: '',
			visibility: '',
			weather: '',
			comment: '',
		});
	};

	const renderRadioButtons = (
		groupName: 'visibility' | 'weather',
		radioValues: Visibility[] | Weather[],
	): JSX.Element => {
		const radioButtonsDiv = radioValues.map((value) => {
			return (
				<div key={value}>
					<input
						type="radio"
						id={value}
						name={groupName}
						onChange={() => setNewDiaryEntry({ ...newDiaryEntry, [groupName]: value })}
					/>
					<label htmlFor={value}>{value}</label>
				</div>
			);
		});

		return <div>{radioButtonsDiv}</div>;
	};

	return (
		<>
			<Notification {...notificationProps} />
			<h2>Add new entry </h2>
			<form onSubmit={diaryEntryCreation}>
				date{' '}
				<input
					type="date"
					value={newDiaryEntry.date}
					onChange={(e) => setNewDiaryEntry({ ...newDiaryEntry, date: e.target.value })}
				/>
				<br />
				visibility {renderRadioButtons('visibility', Object.values(Visibility))}
				<br />
				weather {renderRadioButtons('weather', Object.values(Weather))}
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
