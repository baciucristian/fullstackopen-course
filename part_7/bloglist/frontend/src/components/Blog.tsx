import { type JSX, useState } from 'react';
import type { BlogEntry } from '../types/types';

interface BlogProps {
	blog: BlogEntry;
	addLike: () => void;
	deleteBlog: () => void;
}

const Blog = (props: BlogProps): JSX.Element => {
	const [visible, setVisible] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div style={blogStyle}>
			<p>
				{`${props.blog.id} ${props.blog.title} ${props.blog.author} `}
				<button type="button" onClick={toggleVisibility}>
					view
				</button>
			</p>
			<div style={showWhenVisible} className="togglableContent">
				{props.blog.url} <br />
				likes <span className="likes">{`${props.blog.likes} `}</span>
				<button type="button" onClick={props.addLike}>
					like
				</button>
				<br />
				<button type="button" onClick={props.deleteBlog}>
					delete
				</button>
			</div>
		</div>
	);
};

export default Blog;
