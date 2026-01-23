import type { ChangeEvent, FormEvent, JSX } from 'react';

type LoginFormProps = {
	username: string;
	password: string;
	handleLogin: (event: FormEvent) => Promise<void>;
	handleUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const LoginForm = (props: LoginFormProps): JSX.Element => {
	return (
		<div>
			<h2>Login to application</h2>
			<form onSubmit={props.handleLogin}>
				<div>
					Username{' '}
					<input
						type="text"
						value={props.username}
						name="username"
						id="username"
						onChange={props.handleUsernameChange}
					/>
				</div>

				<div>
					Password{' '}
					<input
						type="password"
						value={props.password}
						name="password"
						id="password"
						onChange={props.handlePasswordChange}
					/>
				</div>

				<button type="submit" id="login-button">
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
