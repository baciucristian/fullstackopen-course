type CoursePart = {
	name: string;
	exerciseCount: number;
};

interface ContentProps {
	parts: CoursePart[];
}

const Content = ({ parts }: ContentProps): JSX.Element => {
	return (
		<>
			<p>
				{parts[0].name} {parts[0].exerciseCount}
			</p>
			<p>
				{parts[1].name} {parts[1].exerciseCount}
			</p>
			<p>
				{parts[2].name} {parts[2].exerciseCount}
			</p>
		</>
	);
};

export default Content;
