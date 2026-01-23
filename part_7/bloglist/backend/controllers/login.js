import { compare } from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
	const body = req.body;

	const user = await User.findOne({ username: body.username });
	const passwordCorrect =
		user === null ? false : compare(body.password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: 'invalid username or password',
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.SECRET);

	return res
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

export default loginRouter;
