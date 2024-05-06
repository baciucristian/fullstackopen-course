type BmiValues =
	| 'Underweight (Severe thinness)'
	| 'Underweight (Moderate thinness)'
	| 'Underweight (Mild thinness)'
	| 'Normal (healthy weight)'
	| 'Overweight (Pre-obese)'
	| 'Obese (Class I)'
	| 'Obese (Class II)'
	| 'Obese (Class III)';

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

console.log(calculateBmi(180, 74));
