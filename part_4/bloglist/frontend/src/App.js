import React, {useState, useEffect} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const userFromLocalStorage = JSON.parse(loggedUserJSON);
      setUser(userFromLocalStorage);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const loginResponse = await loginService.login({username, password});

      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(loginResponse),
      );

      setUser(loginResponse);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('credentials invalid');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  const handleCreate = async event => {
    event.preventDefault();

    try {
      blogService.setToken(user.token);
      const returnedBlog = await blogService.create({title, author, url});
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs(blogs.concat(returnedBlog));
    } catch (exception) {
      console.log(exception);
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <h2>Login to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            Username{' '}
            <input
              type="text"
              value={username}
              name="username"
              onChange={({target}) => setUsername(target.value)}
            />
          </div>

          <div>
            Password{' '}
            <input
              type="password"
              value={password}
              name="password"
              onChange={({target}) => setPassword(target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Blogs</h1>
      <form onSubmit={handleCreate}>
        <p>
          {user.name} logged in{' '}
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </p>
        <h2>Create new blog</h2>
        <p>
          Title:{' '}
          <input
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </p>
        <p>
          Author:{' '}
          <input
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </p>
        <p>
          URL:{' '}
          <input value={url} onChange={({target}) => setUrl(target.value)} />
        </p>
        <button type="submit">Create</button>
      </form>

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
