import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { BrowserRouter } from 'react-router';
import App from './app/App';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);
