import { createServer } from 'node:http';
import app from './app.js'; // the actual Express application
import config from './utils/config.js';
import logger from './utils/logger.js';

const server = createServer(app);

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});
