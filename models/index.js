var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;
if (env === 'development') {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		dialect: 'sqlite',
		storage: __dirname + 'db.sqlite'
	});
} else {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
}
var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.todo = sequelize.import(__dirname + '/todo.js');
module.exports = db;