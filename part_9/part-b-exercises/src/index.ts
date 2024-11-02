import express from 'express';
import { calculateBmi } from './bmiCalculator';
import type { BmiValues } from './bmiCalculator';

const app = express();
const port = 3003;

type ResponseBMI = {
	height: number;
	weight: number;
	BMI: BmiValues;
};

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

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
