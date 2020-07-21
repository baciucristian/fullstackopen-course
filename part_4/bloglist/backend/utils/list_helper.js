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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
