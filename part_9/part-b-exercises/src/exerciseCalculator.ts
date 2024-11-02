import { isNotNumber } from './utils/isNotNumber';

interface ExercisesResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: 1 | 2 | 3;
	ratingDescription: 'purrfect' | 'not great not terrible' | 'bad';
	target: number;
	average: number;
}

interface ExercisesParams {
	dailyExerciseHours: number[];
	target: number;
}

const parseArguments = (args: string[]): ExercisesParams => {
	if (args.length < 4) {
		throw new Error('Not enough arguments');
	}

	const parameters: string[] = args.slice(3, args.length);
	const isArrayNumber: boolean = parameters.every((el) => !isNotNumber(el));
	const dailyExerciseHours: number[] = parameters.map((el) => Number(el));

	if (!isArrayNumber) {
		throw new Error('Provided values were not numbers!');
	}

	const target: number = Number(args[2]);

	return {
		dailyExerciseHours: dailyExerciseHours,
		target: target,
	};
};

function calculateExercises(dailyExerciseHours: number[], target: number): ExercisesResult {
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

	const average: ExercisesResult['average'] = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;

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

try {
	const { dailyExerciseHours, target } = parseArguments(process.argv);
	const result: ExercisesResult = calculateExercises(dailyExerciseHours, target);
	console.log(result);
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}

export { ExercisesParams, ExercisesResult, calculateExercises };
