import cors from 'cors';
import express, { json, static as serveStatic } from 'express';
import { connect } from 'mongoose';

import blogsRouter from './controllers/blogs.js';
import loginRouter from './controllers/login.js';
import testingRouter from './controllers/testing.js';
import usersRouter from './controllers/users.js';

import config from './utils/config.js';
import logger from './utils/logger.js';
import {
	errorHandler,
	requestLogger,
	tokenExtractor,
	unknownEndpoint,
} from './utils/middleware.js';

const app = express();

logger.info('connecting to', config.MONGODB_URI);

connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(serveStatic('build'));
app.use(json());

app.use(requestLogger);
app.use(tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
	app.use('/api/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
