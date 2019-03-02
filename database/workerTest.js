var faker = require('faker');
var fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');
const cluster = require('cluster');
var numWorkers = require('os').cpus().length;

let start = 1;
let end = 1000000;
let batchNumber = 111;

let startTime = performance.now();

if (cluster.isMaster) {
	console.log('workers available:  ', numWorkers);
	for (var i = 0; i < numWorkers; i++) {
		cluster.fork();
	}
	cluster.on('online', worker => {
		console.log(`worker ${worker.process.pid} is up`);
	});
} else {
	let startTime = performance.now();
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
	stream = fs.createWriteStream(`category${batchNumber}.csv`);
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
	stream = fs.createWriteStream(`description${batchNumber}.csv`);
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
	var stream = fs.createWriteStream(`image${batchNumber}.csv`);
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
	stream = fs.createWriteStream(`option${batchNumber}.csv`);
	stream.write(option());

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

	stream = fs.createWriteStream(`product${batchNumber}.csv`);
	stream.write(product());

	stream.end();

	let endTime = performance.now();
	let timeTaken = (endTime - startTime) / 1000;
	console.log('time taken inside generation:   ', timeTaken);
}
let endTime = performance.now();
let timeTaken = (endTime - startTime) / 1000;
console.log('time taken in total:   ', timeTaken);
