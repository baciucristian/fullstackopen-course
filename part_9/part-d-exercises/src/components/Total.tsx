interface TotalProps {
	total: number;
}

const Total = ({ total }: TotalProps): JSX.Element => {
	return <p>Number of exercises {total}</p>;
};

export default Total;
