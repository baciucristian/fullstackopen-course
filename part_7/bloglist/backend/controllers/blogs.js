import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
import User from '../models/user.js';

const blogsRouter = Router();

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
	res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	res.json(blog);
});

blogsRouter.post('/', async (req, res) => {
	const body = req.body;
	const decodedToken = jwt.verify(req.token, process.env.SECRET);
	if (!req.token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' });
	}
	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	return res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res, next) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET);
	if (!req.token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' });
	}

	const blog = await Blog.findById(req.params.id);

	if (blog === null) {
		next();
	}

	if (decodedToken.id.toString() === blog.user.toString()) {
		await Blog.findByIdAndDelete(req.params.id);
		return res.status(204).end();
	}

	return res.status(401).end();
});

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body;
	const updatedBlog = await Blog.findByIdAndUpdate(
		req.params.id,
		{ likes: body.likes },
		{ new: true },
	);
	res.status(200).json(updatedBlog);
});

export default blogsRouter;
