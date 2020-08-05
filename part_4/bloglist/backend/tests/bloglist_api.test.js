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

afterAll(() => {
  mongoose.connection.close();
});
