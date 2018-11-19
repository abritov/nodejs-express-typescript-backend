const defaultConfig = require('./../config/default.js');

if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
}

let config = {};

switch (process.env.NODE_ENV) {
 case 'development':
	 config = require('./../config/dev.js');
	 config = {...defaultConfig, ...config};
	 break;

	 case 'production':
		config = require('./../config/prod.js');
		config = {...defaultConfig, ...config};
		break;
}

module.exports = {
	[process.env.NODE_ENV] : config.db
};