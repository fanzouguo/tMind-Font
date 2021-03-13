// @ts-nocheck
const createFont = require('./util');

const work = async () => {
	try {
		await createFont();
		console.log('Done!');
	} catch (err) {
		console.error(err);
	}
};

work();
