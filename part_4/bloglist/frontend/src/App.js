import React, {useState, useEffect} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  return (
    <div>
      <h1>blogs</h1>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
