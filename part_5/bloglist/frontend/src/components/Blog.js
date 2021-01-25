import React, { useState } from 'react';

const Blog = ({ blog }) => {
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
        {`${blog.title} ${blog.author}`}{' '}
        <button type="button" onClick={toggleVisibility}>
          view
        </button>
      </p>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {blog.likes} <button type="button">like</button> <br />
        {blog.user ? blog.user.name : null} <br />
      </div>
    </div>
  );
};

export default Blog;
