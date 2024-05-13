import { isNotNumber } from './utils/isNotNumber';

interface BmiParams {
	heightArg: number;
	weightArg: number;
}

type BmiValues =
	| 'Underweight (Severe thinness)'
	| 'Underweight (Moderate thinness)'
	| 'Underweight (Mild thinness)'
	| 'Normal (healthy weight)'
	| 'Overweight (Pre-obese)'
	| 'Obese (Class I)'
	| 'Obese (Class II)'
	| 'Obese (Class III)';

const parseArguments = (args: string[]): BmiParams => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
		return {
			heightArg: Number(args[2]),
			weightArg: Number(args[3]),
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};

function calculateBmi(height: number, weight: number): BmiValues {
	const heightInMeters: number = height / 100;
	const squareOfHeight: number = Math.pow(heightInMeters, 2);
	const bmi: number = weight / squareOfHeight;

	if (bmi < 16) {
		return 'Underweight (Severe thinness)';
	} else if (bmi >= 16 && bmi < 17) {
		return 'Underweight (Moderate thinness)';
	} else if (bmi >= 17 && bmi < 18.5) {
		return 'Underweight (Mild thinness)';
	} else if (bmi >= 18.5 && bmi < 25) {
		return 'Normal (healthy weight)';
	} else if (bmi >= 25 && bmi < 30) {
		return 'Overweight (Pre-obese)';
	} else if (bmi >= 30 && bmi < 35) {
		return 'Obese (Class I)';
	} else if (bmi >= 35 && bmi < 40) {
		return 'Obese (Class II)';
	} else if (bmi >= 40) {
		return 'Obese (Class III)';
	}
}

try {
	const { heightArg, weightArg } = parseArguments(process.argv);
	const result: BmiValues = calculateBmi(heightArg, weightArg);
	console.log(`height: ${heightArg}, weight: ${weightArg}, BMI: ${result}`);
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
