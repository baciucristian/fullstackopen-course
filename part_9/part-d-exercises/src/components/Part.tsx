import { PartProps } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const _assertNever = (value: never): never => {
	throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartProps): JSX.Element => {
	switch (part.kind) {
		case 'basic':
			return (
				<p>
					<strong>
						{part.name} {part.exerciseCount}
					</strong>
					<br />
					<i>{part.description}</i>
					<br />
					<span>exercises count {part.exerciseCount}</span>
				</p>
			);
		case 'group':
			return (
				<p>
					<strong>
						{part.name} {part.exerciseCount}
					</strong>
					<br />
					<span>project exercises {part.groupProjectCount}</span>
				</p>
			);
		case 'background':
			return (
				<p>
					<strong>
						{part.name} {part.exerciseCount}
					</strong>
					<br />
					<i>{part.description}</i>
					<br />
					<span>
						submit to <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
					</span>
				</p>
			);
		case 'special':
			return (
				<p>
					<strong>
						{part.name} {part.exerciseCount}
					</strong>
					<br />
					<i>{part.description}</i>
					<br />
					<span>required skills: {part.requirements.join(', ')}</span>
				</p>
			);
		default:
			return _assertNever(part);
	}
};

export default Part;
