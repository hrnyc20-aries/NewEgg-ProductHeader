const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const pool = require('../database/pg_index.js');
const morgan = require('morgan');

app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.get('*.js', function(req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});

app.get('/loaderio-d0ad723afa8d625d753d334652f3897e', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/dist/loaderio-d0ad723afa8d625d753d334652f3897e.txt'));
});

app.get('/:id', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

app.get('/api/items/:id', (req, res) => {
	pool.query(`SELECT * FROM product WHERE id = $1`, [req.params.id], (err, response) => {
		if (err) {
			console.log('error on ITEMS query   >>  ', err);
			res.sendStatus(500);
		}
		if (response) {
			res.send(response.rows[0]);
		} else {
			res.sendStatus(404);
		}
	});
});

app.get('/api/images/:id', (req, res) => {
	pool.query(`SELECT * FROM image WHERE id_product = $1`, [req.params.id], (err, response) => {
		if (err) {
			console.log('error on IMAGES query   >>  ', err);
			res.sendStatus(500);
		}
		if (response) {
			res.send(response.rows);
		} else {
			res.sendStatus(404);
		}
	});
});

app.get('/api/description/:id', (req, res) => {
	pool.query(`SELECT * FROM description WHERE id_product = $1`, [req.params.id], (err, response) => {
		if (err) {
			console.log('error on DESCRIPTION query   >>  ', err);
			res.sendStatus(500);
		}
		if (response) {
			res.send(response.rows);
		} else {
			res.sendStatus(404);
		}
	});
});

app.get('/api/category/:id', (req, res) => {
	pool.query(`SELECT * FROM category WHERE id_product = $1`, [req.params.id], (err, response) => {
		if (err) {
			console.log('error on CATEGORY query   >>  ', err);
			res.sendStatus(500);
		}
		if (response) {
			res.send(response.rows);
		} else {
			res.sendStatus(404);
		}
	});
});

app.get('/api/option_categories/:id', (req, res) => {
	pool.query(`SELECT * FROM option WHERE id_category= $1`, [req.params.id], (err, response) => {
		if (err) {
			console.log('error on OPTION query   >>  ', err);
			res.sendStatus(500);
		}
		if (response) {
			res.send(response.rows);
		} else {
			res.sendStatus(404);
		}
	});
});

let port = process.env.PORT || 3010;
app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
