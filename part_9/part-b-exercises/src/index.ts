import express, { Request, Response } from 'express';
import { isNotNumber } from './utils/isNotNumber';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import type { BmiValues } from './bmiCalculator';
import type { ExercisesResult } from './exerciseCalculator';

const app = express();
const port = 3003;

app.use(express.json());

type ResponseBMI = {
	height: number;
	weight: number;
	BMI: BmiValues;
};

interface ExerciseRequestBody {
	daily_exercises: number[];
	target: number;
}

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	try {
		const height: number = Number(req.query.height);
		const weight: number = Number(req.query.weight);

		if (!height || !weight) {
			throw new Error('malformatted parameters');
		}

		const result: BmiValues = calculateBmi(height, weight);

		const responseResult: ResponseBMI = {
			height: height,
			weight: weight,
			BMI: result,
		};

		res.send(JSON.stringify(responseResult));
	} catch (error: unknown) {
		console.log(error);
		res.status(400).send(JSON.stringify({ error: 'malformatted parameters' }));
	}
});

app.post('/exercises', (req: Request<never, never, ExerciseRequestBody>, res: Response) => {
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		res.status(400).json({ error: 'malformatted parameters' });
		return;
	}

	const areDailyExercisesNumbers: boolean = daily_exercises.every((el) => !isNotNumber(el));
	const isTargetNumber: boolean = !isNotNumber(target);

	if (!areDailyExercisesNumbers || !isTargetNumber) {
		res.status(400).json({ error: 'malformatted parameters' });
		return;
	}

	const exercisesResult: ExercisesResult = calculateExercises(daily_exercises, target);

	res.status(201).json(exercisesResult);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
