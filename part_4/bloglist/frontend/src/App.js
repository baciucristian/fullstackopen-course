import React, {useState, useEffect} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const response = await loginService.login({username, password});
      setUser(response);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('credentials invalid');
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
      <p>{user.name} logged in</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
