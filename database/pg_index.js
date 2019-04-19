const { Pool } = require('pg');
const pool = new Pool({
	user: 'bradleymorgan',
	host: 'ec2-34-207-16-0.compute-1.amazonaws.com',
	max: 20,
	database: 'newegg',
	password: 'test123',
	port: 5432
});

module.exports = pool;
