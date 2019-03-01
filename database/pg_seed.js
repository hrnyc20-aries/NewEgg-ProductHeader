const faker = require('faker');
const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'bradleymorgan',
	host: 'localhost',
	database: 'newegg',
	password: '',
	port: 5432
});

var start = Date.now();

let test = [];
for (var i = 1; i < 10000; i++) {
	test.push({
		id: i,
		imgSrc: faker.image.imageUrl(),
		id_product: faker.random.number({
			min: 1,
			max: 3000
		})
	});
	pool.connect((err, client, done) => {
		if (err) {
			console.log('err on pool connection in DB', err);
		} else {
			test.forEach(unit => {
				client.query(
					`INSERT INTO img (id, imgSrc, id_product) VALUES($1, $2, $3)`,
					[unit.id, unit.imgSrc, unit.id_product],
					(err, result) => {
						if (err) {
							console.log('error on query ', err);
						}
					}
				);
			});
		}
	});
}
var difference = Date.now();
var temp = difference - start;
console.log(temp);
