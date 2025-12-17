import cors from 'cors';
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';

import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
	if (error instanceof SyntaxError && 'body' in error) {
		res.status(400).json({ error: 'Invalid JSON format' });
	}

	next(error);
});

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
