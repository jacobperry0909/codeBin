const mongoose = require('mongoose');

const mongo = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI, { keepAlive: true });
	} catch (e) {
		console.error(e);
	}
	return mongoose;
};

module.exports = mongo;

mongoose.connection.once('open', () => console.log('Connected to Database'));
mongoose.connection.on('error', (error) => console.error(error));
