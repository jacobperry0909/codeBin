const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const userSchema = require('../models/user');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
	done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
	try {
		const user = await userSchema.findOne({ userId });
		if (!user) return done(null, false);
		done(null, user);
	} catch (e) {
		console.error(e);
	}
});

passport.use(
	new LocalStrategy(async (userName, password, done) => {
		try {
			const userExists = await userSchema.findOne({ userName });

			if (!userExists) return done(null, false);

			const passwordsMatch = await bcrypt.compare(
				password,
				userExists.password
			);

			if (!passwordsMatch) return done(null, false);

			done(null, userExists);
		} catch (e) {
			console.error(e);
		}
	})
);
