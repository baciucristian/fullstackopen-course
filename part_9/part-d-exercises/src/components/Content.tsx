import { ContentProps } from '../types';
import Part from './Part';

const Content = ({ parts }: ContentProps): JSX.Element => {
	return (
		<>
			{parts.map((part, i) => {
				return <Part key={i} part={part} />;
			})}
		</>
	);
};

export default Content;
