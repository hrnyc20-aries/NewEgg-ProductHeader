const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'bradleymorgan',
	host: 'ec2-184-72-197-189.compute-1.amazonaws.com',
	database: 'newegg',
	password: 'test123',
	port: 5432
});

module.exports = pool;
