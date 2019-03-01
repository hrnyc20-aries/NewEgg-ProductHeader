var faker = require('faker');
var fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');
let startTime = new Date();
console.log('start', startTime);
let start = performance.now();
console.log('perfromance start', start);
//product
let productStart = 1;
let productEnd = 500000;

let categoryQty = 4000;
let descriptionQty = 900000;
let imgQty = 200000;
let optionQty = 500;

// let category = () => {
// 	let count = 0;
// 	let str = '';
// 	while (count < categoryQty) {
// 		count++;
// 		str += count + ','; // category id
// 		str += faker.lorem.word() + ','; // category name
// 		str +=
// 			faker.random.number({
// 				min: 1,
// 				max: productQty
// 			}) + ','; // referencing product id
// 		str += '\n';
// 	}
// 	return str;
// };
// stream = fs.createWriteStream(__dirname + 'category.csv');
// stream.write(category());

// let description = () => {
// 	let count = 0;
// 	let str = '';
// 	while (count < descriptionQty) {
// 		count++;
// 		str += count + ','; // description id
// 		str += faker.lorem.sentence() + ','; //description bullet
// 		str +=
// 			faker.random.number({
// 				min: 1,
// 				max: productQty
// 			}) + ','; //referencing product id
// 		str += '\n';
// 	}
// 	return str;
// };
// stream = fs.createWriteStream(__dirname + 'description.csv');
// stream.write(description());

// let image = () => {
// 	let count = 0;
// 	let str = '';
// 	while (count < imgQty) {
// 		count++;
// 		str += count + ','; // image id
// 		str += faker.image.image() + ','; // images
// 		str +=
// 			faker.random.number({
// 				min: 1,
// 				max: productQty
// 			}) + ','; // referencing product id
// 		str += '\n';
// 	}
// 	return str;
// };
// var stream = fs.createWriteStream(__dirname + 'image.csv');
// stream.write(image());

// let option = () => {
// 	let count = 0;
// 	let str = '';
// 	while (count < optionQty) {
// 		count++;
// 		str += count + ','; // option id
// 		str += faker.lorem.word() + ','; // option name
// 		str +=
// 			faker.random.number({
// 				min: 1,
// 				max: productQty
// 			}) + ','; // referencing product id
// 		str += '\n';
// 	}
// 	return str;
// };
// stream = fs.createWriteStream(__dirname + 'option.csv');
// stream.write(option());

let product = () => {
	let str = '';
	for (var i = productStart; i < productEnd; i++) {
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
		// str += '\n';
	}
	return str;
};

stream = fs.createWriteStream('product.csv');
stream.write(product());

stream.end();

//performance now - node hooks
//cluster for now
//DB replication sets
let endTime = new Date();
console.log('end', endTime);
let end = performance.now();
console.log('perfromance end', end);
let timeTaken = (end - start) / 1000;
console.log('timeTaken: ', timeTaken);
