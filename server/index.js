const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const pool = require('../database/pg_index.js');
const compression = require('compression');
const morgan = require('morgan');

app.use(compression());
app.use(cors());
app.get('*.js', function(req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});
app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.get('/loaderio*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/dist/loaderio-b1c72e3a83e23c3be254582b10dd16b4.txt'));
});

app.get('/:id', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

// app.get('/api/items/:id', (req, res) => {
// 	pool.query(`SELECT * FROM product WHERE id = $1`, [req.params.id], (err, response) => {
// 		if (err) {
// 			console.log('error on ITEMS query   >>  ', err);
// 			res.sendStatus(500);
// 		}
// 		if (response) {
// 			res.send(response.rows[0]);
// 		} else {
// 			res.sendStatus(404);
// 		}
// 	});
// });

app.get('/api/items/:id', (req, res) => {
	pool.connect().then(client => {
		return client
			.query('SELECT * FROM product WHERE id = $1', [req.params.id])
			.then(response => {
				client.release();
				res.send(response.rows[0]);
				console.log(response.rows[0]);
			})
			.catch(e => {
				client.release();
				console.log(e.stack);
			});
	});
});

// app.get('/api/images/:id', (req, res) => {
// 	pool.query(`SELECT * FROM image WHERE id_product = $1`, [req.params.id], (err, response) => {
// 		if (err) {
// 			console.log('error on IMAGES query   >>  ', err);
// 			res.sendStatus(500);
// 		}
// 		if (response) {
// 			res.send(response.rows);
// 		} else {
// 			res.sendStatus(404);
// 		}
// 	});
// });

app.get('/api/images/:id', (req, res) => {
	pool.connect().then(client => {
		return client
			.query('SELECT * FROM image WHERE id_product = $1', [req.params.id])
			.then(response => {
				client.release();
				res.send(response.rows);
				console.log(response.rows);
			})
			.catch(e => {
				client.release();
				console.log(e.stack);
			});
	});
});

// app.get('/api/description/:id', (req, res) => {
// 	pool.query(`SELECT * FROM description WHERE id_product = $1`, [req.params.id], (err, response) => {
// 		if (err) {
// 			console.log('error on DESCRIPTION query   >>  ', err);
// 			res.sendStatus(500);
// 		}
// 		if (response) {
// 			res.send(response.rows);
// 		} else {
// 			res.sendStatus(404);
// 		}
// 	});
// });

app.get('/api/description/:id', (req, res) => {
	pool.connect().then(client => {
		return client
			.query('SELECT * FROM description WHERE id_product = $1', [req.params.id])
			.then(response => {
				client.release();
				res.send(response.rows);
				console.log(response.rows);
			})
			.catch(e => {
				client.release();
				console.log(e.stack);
			});
	});
});

// app.get('/api/category/:id', (req, res) => {
// 	pool.query(`SELECT * FROM category WHERE id_product = $1`, [req.params.id], (err, response) => {
// 		if (err) {
// 			console.log('error on CATEGORY query   >>  ', err);
// 			res.sendStatus(500);
// 		}
// 		if (response) {
// 			res.send(response.rows);
// 		} else {
// 			res.sendStatus(404);
// 		}
// 	});
// });

app.get('/api/category/:id', (req, res) => {
	pool.connect().then(client => {
		return client
			.query('SELECT * FROM category WHERE id_product = $1', [req.params.id])
			.then(response => {
				client.release();
				res.send(response.rows);
				console.log(response.rows);
			})
			.catch(e => {
				client.release();
				console.log(e.stack);
			});
	});
});

// app.get('/api/option_categories/:id', (req, res) => {
// 	pool.query(`SELECT * FROM option WHERE id_category= $1`, [req.params.id], (err, response) => {
// 		if (err) {
// 			console.log('error on OPTION query   >>  ', err);
// 			res.sendStatus(500);
// 		}
// 		if (response) {
// 			res.send(response.rows);
// 		} else {
// 			res.sendStatus(404);
// 		}
// 	});
// });

app.get('/api/option_categories/:id', (req, res) => {
	pool.connect().then(client => {
		return client
			.query('SELECT * FROM option WHERE id_category = $1', [req.params.id])
			.then(response => {
				client.release();
				res.send(response.rows);
				console.log(response.rows);
			})
			.catch(e => {
				client.release();
				console.log(e.stack);
			});
	});
});

let port = process.env.PORT || 3010;
app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
