import { hash } from 'bcrypt';

import { Router } from 'express';

import User from '../models/user.js';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs');
	res.json(users);
});

usersRouter.post('/', async (req, res) => {
	const body = req.body;

	if (body.password === undefined)
		return res.status(400).json({ error: 'content missing' });

	if (body.password.length < 3)
		return res
			.status(400)
			.json({ error: 'password is shorter than the minimum lenght (3)' });

	const saltRounds = 10;
	const passwordHash = await hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	});

	const savedUser = await user.save();

	return res.json(savedUser);
});

export default usersRouter;
