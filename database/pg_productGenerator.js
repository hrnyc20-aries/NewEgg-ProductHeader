var faker = require('faker');
var fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');

const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'bradleymorgan',
	host: 'localhost',
	database: 'newegg',
	password: '',
	port: 5432,
	max: 20,
	idleTimeoutMillis: 2000000,
	connectionTimeoutMillis: 2000000
});

// row range in millions, starting at 1, ending at 10M, with 1M per batch
let start = 15000000;
let end = 18000000;
// time marker for measuring time required for execution
let startTime = performance.now();

// // generating item description bullets
// let description = () => {
// 	let str = '';
// 	let x = 6000001;
// 	for (var i = start; i < end; i++) {
// 		str += i + '|'; // description id
// 		str += faker.lorem.sentence() + '|'; //description bullet
// 		str += x;
// 		str += '\n';
// 		// str +=
// 		// 	faker.random.number({
// 		// 		min: 8000000,
// 		// 		max: 9000000
// 		// 	}) + '\n'; //referencing product id
// 		x++;
// 	}
// 	return str;
// };

// let descriptionGenerator = () => {
// 	return new Promise((resolve, reject) => {
// 		stream = fs.createWriteStream(`description5.csv`);
// 		resolve(stream.write(description()));
// 	});
// };
// descriptionGenerator();
// // // stream = fs.createWriteStream(`description.csv`);
// // // stream.write(description());

// // // generating options for items
// let option = () => {
// 	let str = '';
// 	let x = 6000001;
// 	for (var i = start; i < end; i++) {
// 		str += i + '|'; // option id
// 		str += faker.lorem.word() + '|'; // option name
// 		str += x;
// 		str += '\n';
// 		// str +=
// 		// 	faker.random.number({
// 		// 		min: 1,
// 		// 		max: 10000000
// 		// 	}) + '\n'; // referencing product id
// 		x++;
// 	}
// 	return str;
// };

// let optionGenerator = () => {
// 	return new Promise((resolve, reject) => {
// 		stream = fs.createWriteStream(`option5.csv`);
// 		resolve(stream.write(option()));
// 	});
// };

optionGenerator();

// DB connection and rows copy
let poolConnection = async () => {
	await pool.connect(async (err, client, done) => {
		if (err) {
			console.log('err on pool connection in DB', err);
		} else {
			await client.query(
				`COPY product FROM '/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/product.csv' DELIMITER '|' CSV`,
				(err, result) => {
					if (err) {
						console.log('error on query ', err);
					}
				}
			);
			console.log('product is loaded');
			await client.query(
				`COPY image FROM '/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/image.csv' DELIMITER '|' CSV`,
				(err, result) => {
					if (err) {
						console.log('error on query ', err);
					}
				}
			);
			console.log('image is loaded');
			await client.query(
				`COPY description FROM '/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/description.csv' DELIMITER '|' CSV`,
				(err, result) => {
					if (err) {
						console.log('error on query ', err);
					}
				}
			);
			console.log('description is loaded');
			await client.query(
				`COPY option FROM '/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/option.csv' DELIMITER '|' CSV`,
				(err, result) => {
					if (err) {
						console.log('error on query ', err);
					}
				}
			);
			console.log('option is loaded');
			await client.query(
				`COPY category FROM '/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/category.csv' DELIMITER '|' CSV`,
				(err, result) => {
					if (err) {
						console.log('error on query ', err);
					}
				}
			);
			console.log('category is loaded');
		}
		await client.release();
		let endTime = performance.now();
		let timeTaken = (endTime - startTime) / 1000;
		console.log('time taken:   ', timeTaken);
	});
};

// generating item categories

// let category = () => {
// 	let str = '';
// 	for (var i = start; i < end; i++) {
// 		str += i + '|'; // category id
// 		str += faker.lorem.word() + '|'; // category name
// 		str +=
// 			faker.random.number({
// 				min: 8000000,
// 				max: 9000000
// 			}) + '\n'; // referencing product id
// 	}
// 	return str;
// };

// let categoryGenerator = () => {
// 	return new Promise((resolve, reject) => {
// 		stream = fs.createWriteStream(`category_new0.csv`);
// 		resolve(stream.write(category()));
// 	});
// };

// categoryGenerator();

// generating images
// let image = () => {
// 	let str = '';
// 	let x = 6000000;
// 	for (var i = start; i < end; i++) {
// 		str += i + '|'; // image id
// 		str += faker.image.image() + '|'; // images
// 		str += x;
// 		str += '\n';
// 		// str +=
// 		// 	faker.random.number({
// 		// 		min: 1,
// 		// 		max: 1000000
// 		// 	}) + '\n'; // referencing product id
// 		x++;
// 	}
// 	return str;
// };
// let imageGenerator = () => {
// 	return new Promise((resolve, reject) => {
// 		stream = fs.createWriteStream(`image5.csv`);
// 		resolve(stream.write(image()));
// 	});
// };

// imageGenerator();
// var stream = fs.createWriteStream(`image.csv`);
// stream.write(image());

// // stream = fs.createWriteStream(`option.csv`);
// // stream.write(option());

// // generating items
// let product = () => {
// 	let str = '';
// 	for (var i = start; i < end; i++) {
// 		str += i + '|'; // product id - incrementor
// 		str += faker.commerce.productName() + '|'; // product name
// 		str += i + '|'; // item number - duplicates product id for some reason
// 		str += faker.random.number({ min: 0, max: 5 }) + '|'; // reviewRate - item rating
// 		str += faker.random.number({ min: 1, max: 3500 }) + '|'; // reviewNum - how many reviews are there for the specific item
// 		str += faker.random.number({ min: 1, max: 100 }) + '|'; // questionNum - how many questions are there for the specific item
// 		str += faker.random.number({ min: 1, max: 100 }) + '|'; // aswerNum - how many answers are there for the specific item
// 		str += faker.random.number({ min: 1, max: 999 }) + '|'; // stock amount
// 		str += faker.random.number({ min: 1, max: 10 }) + '|'; // sell limit
// 		str += faker.random.number({ min: 5, max: 3000, precision: 0.01 }).toFixed(2) + '|'; // lowest price
// 		str += faker.image.imageUrl() + '|'; //some logo overlay, not used on FE currently
// 		str += faker.random.number({ min: 0, max: 1 }) + '|'; // stock Status - 0 for false, 1 for true
// 		str += faker.address.country() + '|'; // sell from - pick a country
// 		str += faker.company.companyName() + '\n'; // ship origin - just a store name, use lorem word
// 	}
// 	return str;
// };

// let productGenerator = () => {
// 	return new Promise((resolve, reject) => {
// 		stream = fs.createWriteStream(`product.csv`);
// 		resolve(stream.write(product()));
// 	});
// };
// // stream = fs.createWriteStream(`product.csv`);
// // stream.write(product());

// (async () => {
// 	await productGenerator();
// 	await imageGenerator();
// 	await optionGenerator();
// 	await descriptionGenerator();
// 	await categoryGenerator();
// })();
// poolConnection();
// fs.unlink('/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/category.csv', err => {
// 	if (err) throw err;
// 	console.log('category.csv');
// });
// fs.unlink('/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/option.csv', err => {
// 	if (err) throw err;
// 	console.log('option.csv');
// });
// fs.unlink('/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/product.csv', err => {
// 	if (err) throw err;
// 	console.log('product.csv');
// });
// fs.unlink('/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/description.csv', err => {
// 	if (err) throw err;
// 	console.log('description.csv');
// });
// fs.unlink('/Users/bradleymorgan/Desktop/hrnyc20/NewEgg-ProductHeader/database/image.csv', err => {
// 	if (err) throw err;
// 	console.log('image.csv');
// });
// copy stream result to DB

// ending time marker
// let endTime = performance.now();
// let timeTaken = (endTime - startTime) / 1000;
// console.log('time taken:   ', timeTaken);
