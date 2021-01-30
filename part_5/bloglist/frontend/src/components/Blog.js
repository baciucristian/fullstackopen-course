import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, addLike, deleteBlog }) => {
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
        {`${blog.id} ${blog.title} ${blog.author} `}
        <button type="button" onClick={toggleVisibility}>
          view
        </button>
      </p>
      <div style={showWhenVisible} className="togglableContent">
        {blog.url} <br />
        likes {`${blog.likes} `}
        <button type="button" onClick={addLike}>
          like
        </button>
        <br />
        {blog.user.name} <br />
        <button type="button" onClick={deleteBlog}>
          delete
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
