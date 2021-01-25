import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(title, author, url);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <p>
          Title:{' '}
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          Author:{' '}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          URL:{' '}
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
