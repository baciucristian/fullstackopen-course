import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationColor, setNotificationColor] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const userFromLocalStorage = JSON.parse(loggedUserJSON);
      setUser(userFromLocalStorage);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginResponse = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(loginResponse)
      );

      setUser(loginResponse);
      setUsername('');
      setPassword('');

      setNotificationColor('green');
      setNotificationMessage('Logged in!');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      console.log('credentials invalid');

      setNotificationColor('red');
      setNotificationMessage('Wrong username or password!');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
    setNotificationColor('green');
    setNotificationMessage('Logged out!');
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleCreate = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility();
      blogService.setToken(user.token);
      const returnedBlog = await blogService.create({ title, author, url });

      setBlogs(blogs.concat(returnedBlog));

      setNotificationColor('green');
      setNotificationMessage('Blog created successfully!');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      console.log('Missing field');
      setNotificationColor('red');
      setNotificationMessage('Missing field!');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleLogin={handleLogin}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
