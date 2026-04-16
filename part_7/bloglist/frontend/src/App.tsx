import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { useBlogActions, useBlogs, useBlogsToRender } from './stores/useBlogStore';
import {
	useNotificationColor,
	useNotificationControls,
	useNotificationMessage,
} from './stores/useNotificationStore';
import { usePassword, useUser, useUserActions, useUsername } from './stores/useUserStore';

interface TogglableHandle {
	toggleVisibility: () => void;
}

const App = () => {
	const blogs = useBlogs();
	const blogsToRender = useBlogsToRender();
	const { setBlogs, setBlogsToRender } = useBlogActions();

	const username = useUsername();
	const password = usePassword();
	const user = useUser();
	const { setUsername, setPassword, setUser } = useUserActions();

	const notificationMessage = useNotificationMessage();
	const notificationColor = useNotificationColor();
	const { setNotification, clearNotification } = useNotificationControls();

	const blogFormRef = useRef<TogglableHandle>(null);

	useEffect(() => {
		blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
	}, [setBlogs]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
		if (loggedUserJSON) {
			const userFromLocalStorage = JSON.parse(loggedUserJSON);
			setUser(userFromLocalStorage);
		}
	}, [setUser]);

	useEffect(() => {
		const sortedBlogsByLikes = [...blogs].sort((a, b) => a.likes - b.likes);
		setBlogsToRender(sortedBlogsByLikes);
	}, [blogs, setBlogsToRender]);

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const loginResponse = await loginService.login({ username, password });

			window.localStorage.setItem('loggedBloglistUser', JSON.stringify(loginResponse));

			setUser(loginResponse);
			setUsername('');
			setPassword('');

			setNotification('Logged in!', 'green');
			setTimeout(() => {
				clearNotification();
			}, 5000);
		} catch {
			console.log('credentials invalid');

			setNotification('Wrong username or password!', 'red');
			setTimeout(() => {
				clearNotification();
			}, 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBloglistUser');
		setUser(null);
		setNotification('Logged out!', 'green');
		setTimeout(() => {
			clearNotification();
		}, 5000);
	};

	const handleCreate = async (title: string, author: string, url: string) => {
		try {
			blogFormRef.current?.toggleVisibility();

			if (!user) return;

			blogService.setToken(user.token);
			const returnedBlog = await blogService.create({ title, author, url });

			setBlogs(blogs.concat(returnedBlog));

			setNotification('Blog created successfully!', 'green');
			setTimeout(() => {
				clearNotification();
			}, 5000);
		} catch {
			console.log('Missing field');
			setNotification('Missing field!', 'red');
			setTimeout(() => {
				clearNotification();
			}, 5000);
		}
	};

	const addLikeOf = async (id: string) => {
		try {
			const blog = blogs.find((n) => n.id === id);
			if (!blog) return;

			const changedBlog = {
				title: blog.title,
				author: blog.author,
				url: blog.url,
				likes: blog.likes + 1,
			};
			const returnedBlog = await blogService.update(id, changedBlog);

			setBlogs(blogs.map((n) => (n.id !== id ? n : returnedBlog)));
		} catch (exception) {
			console.error(exception);
		}
	};

	const deleteBlogOf = async (id: string) => {
		try {
			if (!user) return;

			blogService.setToken(user.token);
			const blog = blogs.find((n) => n.id === id);
			if (!blog) return;

			const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
			if (result) {
				await blogService.deleteBlog(id);
				setBlogs(blogs.filter((n) => n.id !== id));
			}
		} catch (exception) {
			console.error(exception);
		}
	};

	const loginForm = () => (
		<LoginForm
			username={username}
			password={password}
			handleLogin={handleLogin}
			handleUsernameChange={(e) => setUsername(e.target.value)}
			handlePasswordChange={(e) => setPassword(e.target.value)}
		/>
	);

	const blogForm = () => (
		<Togglable buttonLabel="new blog" ref={blogFormRef}>
			<BlogForm createBlog={handleCreate} />
		</Togglable>
	);

	return (
		<div>
			<h1>Blogs</h1>
			<Notification message={notificationMessage} color={notificationColor} />
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged in{' '}
						<button type="button" onClick={handleLogout}>
							Logout
						</button>
					</p>
					{blogForm()}
					{blogsToRender.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							addLike={() => addLikeOf(blog.id)}
							deleteBlog={() => deleteBlogOf(blog.id)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
