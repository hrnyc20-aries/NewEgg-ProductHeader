var faker = require('faker');
var fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');

const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'bradleymorgan',
	host: 'localhost',
	database: 'newegg',
	password: '',
	port: 5432
});
// time marker for measuring time required for execution
let startTime = performance.now();

// DB connection and rows copy
let poolConnection = () => {
	pool.connect((err, client, done) => {
		if (err) {
			console.log('err on pool connection in DB', err);
		} else {
			client.query(
				`COPY product FROM '/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/product.csv' DELIMITER '|' CSV`,
				(err, result) => {
					if (err) {
						console.log('error on query ', err);
					}
				}
			);
		}
	});
};

// row range in millions, starting at 1, ending at 10M, with 1M per batch
let start = 5000000;
let end = 6000000;

// generating item categories
let category = () => {
	let str = '';
	for (var i = start; i < end; i++) {
		str += i + '|'; // category id
		str += faker.lorem.word() + '|'; // category name
		str +=
			faker.random.number({
				min: 1,
				max: 10000000
			}) + '\n'; // referencing product id
	}
	return str;
};
stream = fs.createWriteStream(`category.csv`);
stream.write(category());

// generating item description bullets
let description = () => {
	let str = '';
	for (var i = start; i < end; i++) {
		str += i + '|'; // description id
		str += faker.lorem.sentence() + '|'; //description bullet
		str +=
			faker.random.number({
				min: 1,
				max: 10000000
			}) + '\n'; //referencing product id
	}
	return str;
};
stream = fs.createWriteStream(`description.csv`);
stream.write(description());

// generating images
let image = () => {
	let str = '';
	for (var i = start; i < end; i++) {
		str += i + '|'; // image id
		str += faker.image.image() + '|'; // images
		str +=
			faker.random.number({
				min: 1,
				max: 10000000
			}) + '\n'; // referencing product id
	}
	return str;
};
var stream = fs.createWriteStream(`image.csv`);
stream.write(image());

// generating options for items
let option = () => {
	let str = '';
	for (var i = start; i < end; i++) {
		str += i + '|'; // option id
		str += faker.lorem.word() + '|'; // option name
		str +=
			faker.random.number({
				min: 1,
				max: 10000000
			}) + '\n'; // referencing product id
	}
	return str;
};
stream = fs.createWriteStream(`option.csv`);
stream.write(option());

// generating items
let product = () => {
	let str = '';
	for (var i = start; i < end; i++) {
		str += i + '|'; // product id - incrementor
		str += faker.commerce.productName() + '|'; // product name
		str += i + '|'; // item number - duplicates product id for some reason
		str += faker.random.number({ min: 0, max: 5 }) + '|'; // reviewRate - item rating
		str += faker.random.number({ min: 1, max: 3500 }) + '|'; // reviewNum - how many reviews are there for the specific item
		str += faker.random.number({ min: 1, max: 100 }) + '|'; // questionNum - how many questions are there for the specific item
		str += faker.random.number({ min: 1, max: 100 }) + '|'; // aswerNum - how many answers are there for the specific item
		str += faker.random.number({ min: 1, max: 999 }) + '|'; // stock amount
		str += faker.random.number({ min: 1, max: 10 }) + '|'; // sell limit
		str += faker.random.number({ min: 5, max: 3000, precision: 0.01 }).toFixed(2) + '|'; // lowest price
		str += faker.image.imageUrl() + '|'; //some logo overlay, not used on FE currently
		str += faker.random.number({ min: 0, max: 1 }) + '|'; // stock Status - 0 for false, 1 for true
		str += faker.address.country() + '|'; // sell from - pick a country
		str += faker.company.companyName() + '\n'; // ship origin - just a store name, use lorem word
	}
	return str;
};
stream = fs.createWriteStream(`product.csv`);
stream.write(product());

// copy stream result to DB
stream.end(null, null, poolConnection);

// ending time marker
let endTime = performance.now();
let timeTaken = (endTime - startTime) / 1000;
console.log('time taken:   ', timeTaken);
