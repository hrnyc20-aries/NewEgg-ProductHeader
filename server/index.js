// const sqlite3 = require('sqlite3');
// const axios = require('axios');
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const pg = require('../database/pg_index.js');

app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.get('*.js', function(req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});

app.get('/:id', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

app.get('/api/items/:id', (req, res) => {
	pg.connect((err, client, done) => {
		if (err) {
			console.log('err on pool connection in DB', err);
		} else {
			client.query(`SELECT * FROM product WHERE id = $1`, [req.params.id], (err, response) => {
				if (err) {
					console.log('error on query ', err);
				} else {
					res.send(response.rows);
				}
			});
		}
	});
});

app.get('/api/images/:id', (req, res) => {
	pg.connect((err, client, done) => {
		if (err) {
			console.log('err on pool connection in DB', err);
		} else {
			client.query(`SELECT * FROM image WHERE id_product = $1`, [req.params.id], (err, response) => {
				if (err) {
					console.log('error on query ', err);
				} else {
					res.send(response.rows);
				}
			});
		}
	});
});

app.get('/api/description/:id', (req, res) => {
	pg.connect((err, client, done) => {
		if (err) {
			console.log('err on pool connection in DB', err);
		} else {
			client.query(`SELECT * FROM description WHERE id_product = $1`, [req.params.id], (err, response) => {
				if (err) {
					console.log('error on query ', err);
				} else {
					res.send(response.rows);
				}
			});
		}
	});
});

app.get('/api/category/:id', (req, res) => {
	pg.connect((err, client, done) => {
		if (err) {
			console.log('err on pool connection in DB', err);
		} else {
			client.query(`SELECT * FROM category WHERE id_product = $1`, [req.params.id], (err, response) => {
				err ? console.log('error on query category', err) : res.send(response.rows);

				// if (err) {
				// 	console.log('error on query ', err);
				// } else {
				// 	res.send(response.rows);
				// }
			});
		}
	});
});

app.get('/api/option_categories/:id', (req, res) => {
	pg.connect((err, client, done) => {
		if (err) {
			console.log('err on pool connection in DB', err);
		} else {
			client.query(`SELECT * FROM category WHERE id_category = $1`, [req.params.id], (err, response) => {
				if (err) {
					console.log('error on query ', err);
				} else {
					res.send(response.rows);
				}
			});
		}
	});
});
let port = process.env.PORT || 3010;
app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
