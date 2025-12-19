import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { type JSX, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import api from '@/services/patients';
import { type NewEntry, NewEntrySchema, type Patient } from '@/types/types';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';

import 'react-datepicker/dist/react-datepicker.css';

type PatientFormParams = {
	patientId: string;
	setPatientEntry: React.Dispatch<React.SetStateAction<Patient | undefined>>;
};

const PatientForm = ({
	patientId,
	setPatientEntry,
}: PatientFormParams): JSX.Element => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const form = useForm<NewEntry>({
		resolver: zodResolver(NewEntrySchema),
		mode: 'onChange',
		defaultValues: {
			type: 'HealthCheck',
			specialist: '',
			description: '',
			date: '',
			diagnosisCodes: [],
			healthCheckRating: 0,
		},
	});

	const watchTypeField = form.watch('type');

	useEffect(() => {
		const commonValues = {
			description: form.getValues('description'),
			date: form.getValues('date'),
			specialist: form.getValues('specialist'),
			diagnosisCodes: form.getValues('diagnosisCodes'),
		};

		switch (watchTypeField) {
			case 'HealthCheck':
				form.reset({
					...commonValues,
					type: 'HealthCheck',
					healthCheckRating: 0,
				});
				break;
			case 'OccupationalHealthcare':
				form.reset({
					...commonValues,
					type: 'OccupationalHealthcare',
					employerName: '',
					sickLeave: { startDate: '', endDate: '' },
				});
				break;
			case 'Hospital':
				form.reset({
					...commonValues,
					type: 'Hospital',
					discharge: { date: '', criteria: '' },
				});
				break;
		}
	}, [watchTypeField, form]);

	const onSubmit = async (values: NewEntry) => {
		console.log('Form submitted:', values);

		try {
			const newEntry = await api.createNewEntry(patientId, values);
			console.log('Entry created:', newEntry);
			setPatientEntry((prev) =>
				prev ? { ...prev, entries: [...prev.entries, newEntry] } : prev,
			);
			form.reset();
			setIsFormOpen(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err.response?.data);
			} else {
				console.error(err);
			}
		}
	};

	return (
		<div className="mt-4">
			{!isFormOpen && (
				<Button variant="secondary" onClick={() => setIsFormOpen(true)}>
					Open Form
				</Button>
			)}

			{isFormOpen && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 rounded-lg border border-border p-6 shadow-sm"
					>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="HealthCheck">Health Check</SelectItem>
											<SelectItem value="OccupationalHealthcare">
												Occupational Healthcare
											</SelectItem>
											<SelectItem value="Hospital">Hospital</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											placeholder="Description"
											{...field}
											value={field.value ?? ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date</FormLabel>
									<FormControl>
										<DatePicker
											selected={field.value ? new Date(field.value) : null}
											onChange={(date: Date | null) =>
												field.onChange(date?.toISOString().split('T')[0])
											}
											placeholderText="Select date"
											className="w-full rounded border px-2 py-1"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="specialist"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Specialist</FormLabel>
									<FormControl>
										<Input
											placeholder="Specialist"
											{...field}
											value={field.value ?? ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{watchTypeField === 'HealthCheck' && (
							<FormField
								control={form.control}
								name="healthCheckRating"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Health Check Rating</FormLabel>
										<FormControl>
											<Input
												placeholder="Health Check Rating"
												{...field}
												value={Number.isNaN(field.value) ? '' : field.value}
												onChange={(e) => field.onChange(Number(e.target.value))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<FormField
							control={form.control}
							name="diagnosisCodes"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Diagnosis Codes</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter codes separated by commas"
											{...field}
											onChange={(e) =>
												field.onChange(
													e.target.value.split(',').map((code) => code.trim()),
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{watchTypeField === 'OccupationalHealthcare' && (
							<>
								<FormField
									control={form.control}
									name="employerName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Employer</FormLabel>
											<FormControl>
												<Input
													placeholder="Employer"
													{...field}
													value={field.value ?? ''}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<hr />

								<p>Sick leave</p>

								<FormField
									control={form.control}
									name="sickLeave.startDate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Start</FormLabel>
											<FormControl>
												<DatePicker
													selected={field.value ? new Date(field.value) : null}
													onChange={(date: Date | null) =>
														field.onChange(date?.toISOString().split('T')[0])
													}
													placeholderText="Select date"
													className="w-full rounded border px-2 py-1"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="sickLeave.endDate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>End</FormLabel>
											<FormControl>
												<DatePicker
													selected={field.value ? new Date(field.value) : null}
													onChange={(date: Date | null) =>
														field.onChange(date?.toISOString().split('T')[0])
													}
													placeholderText="Select date"
													className="w-full rounded border px-2 py-1"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}

						{watchTypeField === 'Hospital' && (
							<>
								<hr />

								<p>Discharge</p>

								<FormField
									control={form.control}
									name="discharge.date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Start</FormLabel>
											<FormControl>
												<DatePicker
													selected={field.value ? new Date(field.value) : null}
													onChange={(date: Date | null) =>
														field.onChange(date?.toISOString().split('T')[0])
													}
													placeholderText="Select date"
													className="w-full rounded border px-2 py-1"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="discharge.criteria"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Criteria</FormLabel>
											<FormControl>
												<Input
													placeholder="Criteria"
													{...field}
													value={field.value ?? ''}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}

						<div className="flex justify-between">
							<Button
								variant="secondary"
								type="reset"
								onClick={() => setIsFormOpen(false)}
							>
								Cancel
							</Button>
							<Button variant="secondary" type="submit">
								Submit
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};

export default PatientForm;
