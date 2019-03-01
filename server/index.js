const sqlite3 = require('sqlite3');
const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

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

// db connect
const db = new sqlite3.Database('./database/productHeader.db', err => {
	if (err) console.log(err);
	else console.log('db connect success');
});

// query DB
app.get('/api/items/:id', (req, res) => {
	// sends client product table
	db.get('SELECT * FROM product WHERE id=(?)', [req.params.id], (err, response) => {
		if (err) console.log('db get request failed:', err);
		else {
			res.send(response);
		}
	});
});

app.get('/api/images/:id', (req, res) => {
	db.all('SELECT * FROM img WHERE id_product=(?)', [req.params.id], (err, response) => {
		if (err) console.log('db get img request failed:', err);
		else {
			res.send(response);
		}
	});
});

app.get('/api/description/:id', (req, res) => {
	db.all('SELECT * FROM description WHERE id_product=(?)', [req.params.id], (err, response) => {
		if (err) console.log('db get description request failed:', err);
		else {
			res.send(response);
		}
	});
});

app.get('/api/category/:id', (req, res) => {
	db.all('SELECT * FROM category WHERE id_product=(?)', [req.params.id], (err, response) => {
		if (err) console.log('db get category request failed:', err);
		else {
			res.send(response);
		}
	});
});

app.get('/api/option_categories/:id', (req, res) => {
	db.all('SELECT * FROM optionCategories WHERE id_category=(?)', [req.params.id], (err, response) => {
		if (err) console.log('db get optionCategories request failed:', err);
		else {
			res.send(response);
		}
	});
});

let port = process.env.PORT || 3010;
app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
