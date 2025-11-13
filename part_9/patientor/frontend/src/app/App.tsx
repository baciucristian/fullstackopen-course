import { Route, Routes } from 'react-router';
import Patient from '@/app/routes/Patient';
import PatientEntries from '@/app/routes/PatientEntries';

function App() {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-muted">
			<div className="w-full max-w-sm">
				<Routes>
					<Route path="/patient/:patientId" element={<Patient />} />
					<Route path="/" element={<PatientEntries />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
