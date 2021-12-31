const router = require('express').Router();
const passport = require('passport');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const userSchema = require('../models/user');

router.post('/createUser', async (req, res) => {
	const { username, password: rawPassword } = req.body;

	const usernameCheck = await userSchema.findOne({ username });

	if (usernameCheck) return res.json({ err: 'username taken' });

	let id = uuid.v4();

	let idCheck = (await userSchema.findOne({ userId: id })) ? true : false;

	while (idCheck) {
		id = uuid.v4();
		idCheck = (await userSchema.findOne({ userId: id })) ? true : false;
	}

	const password = await bcrypt.hash(rawPassword, 10);

	await new userSchema({
		userId: id,
		username,
		password,
	}).save();

	return res.json({ msg: 'account created' });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	console.log(req.user);
	res.json({ user: req.user });
});

router.get('/', (req, res) => {
	const { user } = req;
	res.json(user);
});

module.exports = router;
