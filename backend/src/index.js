const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectMongo = require('connect-mongo');
require('dotenv').config();
const mongo = require('./mongo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		secret: 'lksclskcnskjndcapaojwpoqwdkpojmalkcnslkcnsldcmalm;alsxaowxpowdk',
		cookie: {
			maxAge: 60000 * 60 * 24 * 30 * 6,
		},
		saveUninitialized: false,
		resave: false,
		store: connectMongo.create({ mongoUrl: process.env.DATABASE_URI }),
	})
);

app.use(passport.initialize());
app.use(passport.session());
require('./Strategies/local');

app.get('/test', (req, res) => {
	res.send('success');
});

app.use('/api/v1/', require('./routes/routes.js'));

const PORT = process.env.PORT || 5000;

mongo().then(() =>
	app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
);
