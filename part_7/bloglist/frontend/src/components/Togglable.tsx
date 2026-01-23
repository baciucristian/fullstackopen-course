import {
	forwardRef,
	type ReactNode,
	useImperativeHandle,
	useState,
} from 'react';

type TogglableProps = {
	buttonLabel: string;
	children: ReactNode;
};

const Togglable = forwardRef(
	({ buttonLabel, children }: TogglableProps, ref) => {
		const [visible, setVisible] = useState(false);

		const hideWhenVisible = { display: visible ? 'none' : '' };
		const showWhenVisible = { display: visible ? '' : 'none' };

		const toggleVisibility = () => {
			setVisible(!visible);
		};

		useImperativeHandle(ref, () => {
			return {
				toggleVisibility,
			};
		});

		return (
			<div>
				<div style={hideWhenVisible}>
					<button type="button" onClick={toggleVisibility}>
						{buttonLabel}
					</button>
				</div>
				<div style={showWhenVisible}>
					{children}
					<button type="button" onClick={toggleVisibility}>
						cancel
					</button>
				</div>
			</div>
		);
	},
);

Togglable.displayName = 'Togglable';

export default Togglable;
