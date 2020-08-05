const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('../utils/test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('all blogs are returned in JSON', async () => {
  const response = await api.get('/api/blogs');
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier property of the blog is named id,', async () => {
  const blogsInDb = await helper.blogsInDb();

  expect(blogsInDb[0].id).toBeDefined();
});

test('a valid blog can be added,', async () => {
  const newBlog = {
    title: 'The future of spaceflight',
    author: 'Nadia Drake',
    url:
      'https://www.nationalgeographic.com/science/space/space-exploration/future-spaceflight/',
    likes: 145,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map(blog => blog.title);
  expect(contents).toContain('The future of spaceflight');
});

afterAll(() => {
  mongoose.connection.close();
});
