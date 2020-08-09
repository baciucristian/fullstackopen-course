const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('../utils/test_helper');
const blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some blogs saved', () => {
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
});

describe('addition of a new blog', () => {
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

  test('if likes property is missing, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Is SpaceX’s raptor engine the king of rocket engines?',
      author: 'Everyday Astronaut',
      url: 'https://everydayastronaut.com/raptor-engine/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const lastItem = blogsAtEnd[blogsAtEnd.length - 1];
    expect(lastItem.likes).toBe(0);
  });

  test('if title and url properties are missing, the backend responds with status code 400', async () => {
    const newBlog = {
      author: 'Everyday Astronaut',
      likes: '235',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map(b => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
