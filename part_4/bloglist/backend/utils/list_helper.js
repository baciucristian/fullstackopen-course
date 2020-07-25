const _ = require('lodash');

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = blogs => {
  const max = blogs.reduce((prev, current) => {
    return current.likes > prev.likes ? current : prev;
  }, blogs[0]);

  return blogs.length === 0 ? 0 : max;
};

const mostBlogs = blogs => {
  const countByAuthor = _.countBy(blogs, blog => blog.author);

  const max = Object.keys(countByAuthor).reduce((prev, current) => {
    return countByAuthor[current] > countByAuthor[prev] ? current : prev;
  }, Object.keys(countByAuthor)[0]);

  const newObject = {
    author: max,
    blogs: countByAuthor[max],
  };

  return newObject;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
