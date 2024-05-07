interface ExercisesResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: 1 | 2 | 3;
	ratingDescription: 'purrfect' | 'not great not terrible' | 'bad';
	target: number;
	average: number;
}

function calculateExercises(
	dailyExerciseHours: number[],
	target: number
): ExercisesResult {
	const periodLength: number = dailyExerciseHours.length;

	let trainingDays: ExercisesResult['trainingDays'] = 0;
	let success: ExercisesResult['success'] = false;
	let noOfTargetDaysReached: number = 0;
	dailyExerciseHours.forEach((hours) => {
		if (hours > 0) {
			trainingDays++;
		}

		if (hours >= target) {
			success = true;
			noOfTargetDaysReached++;
		} else {
			success = false;
		}
	});

	let rating: ExercisesResult['rating'];
	let ratingDescription: ExercisesResult['ratingDescription'];
	switch (noOfTargetDaysReached) {
		case 0:
		case 1:
		case 2:
			rating = 1;
			ratingDescription = 'bad';
			break;
		case 6:
		case 7:
			rating = 3;
			ratingDescription = 'purrfect';
			break;
		default:
			rating = 2;
			ratingDescription = 'not great not terrible';
			break;
	}

	const average: ExercisesResult['average'] =
		dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average: average,
	};
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
