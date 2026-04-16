import { type JSX, useState } from 'react';

type BlogFormProps = {
	createBlog: (title: string, author: string, url: string) => void;
};

const useField = (type: string) => {
	const [value, setValue] = useState('');

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return {
		type,
		value,
		onChange,
	};
};

const BlogForm = ({ createBlog }: BlogFormProps): JSX.Element => {
	const title = useField('text');
	const author = useField('text');
	const url = useField('text');

	const addBlog = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		createBlog(title.value, author.value, url.value);
	};

	return (
		<div className="formDiv">
			<h2>Create new blog</h2>
			<form onSubmit={addBlog}>
				<p>
					Title: <input id="title" {...title} />
				</p>
				<p>
					Author: <input id="author" {...author} />
				</p>
				<p>
					URL: <input id="url" {...url} />
				</p>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default BlogForm;
