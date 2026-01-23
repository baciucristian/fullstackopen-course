const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('../utils/test_helper');
const User = require('../models/user');

const api = supertest(app);

let token;
let rootUserID;

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({username: 'root', passwordHash});
  rootUserID = user._id;
  await user.save();

  // get token
  const response = await api.post('/api/login').send({
    username: 'root',
    password: 'secret',
  });

  token = response.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const user = await User.findById(rootUserID);

  const blogObjects = helper.initialBlogs.map(
    blog =>
      new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: user._id,
      }),
  );
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray, user.save());
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('if token is missing, the backend responds with status code 401,', async () => {
    const newBlog = {
      title: 'The future of SpaceX',
      author: 'Elon Musk',
      url: 'https://www.spacex.com/news',
      likes: 32,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map(b => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('update of a blog', () => {
  test('update likes and succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const newLikes = {
      likes: 50,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newLikes).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];

    expect(updatedBlog.title).toBe(blogToUpdate.title);
    expect(updatedBlog.author).toBe(blogToUpdate.author);
    expect(updatedBlog.url).toBe(blogToUpdate.url);
    expect(updatedBlog.likes).toBe(50);
  });
});

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'BaciuNess',
      name: 'Cristian Baciu',
      password: 'portugal',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('if username or password are missing, the backend responds with status code 400', async () => {
    const newUser = {
      name: 'Cristian Baciu',
      password: 'portugal',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('if username or password has length less than 3 characters, the backend responds with status code 400', async () => {
    const newUser = {
      username: 'Resiv',
      name: 'Marius Cojocaru',
      password: 'po',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
