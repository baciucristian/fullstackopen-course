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

const mostLikes = blogs => {
  const groupsByAuthor = _.groupBy(blogs, 'author');

  const arrayOfAuthorsLikes = Object.keys(groupsByAuthor).map(author => {
    // Get the likes for each author
    let likes = 0;

    Object.keys(groupsByAuthor[author]).forEach(i => {
      likes += groupsByAuthor[author][i].likes;
    });

    return {
      author: groupsByAuthor[author][0].author,
      likes: likes,
    };
  });

  const max = arrayOfAuthorsLikes.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });

  return max;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
