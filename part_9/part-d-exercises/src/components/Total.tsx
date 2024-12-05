import { TotalProps } from '../types';

const Total = ({ total }: TotalProps): JSX.Element => {
	return <p>Number of exercises {total}</p>;
};

export default Total;
