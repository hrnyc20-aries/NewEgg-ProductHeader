let Product = require('./index.js')
let Image = require('./index.js')
let Description = require('./index.js')
let Category = require('./index.js')
let Option = require('./index.js')
const images  = require('./data.js')
const faker = require('faker')
const { PerformanceObserver, performance } = require('perf_hooks')
 
const shuffle = (array) => {
	for (var i = array.length - 1; i > 0; i--) {
			var randomIdx = Math.floor(Math.random()*(i+1))
			var itemAtIdx = array[randomIdx]
			array[randomIdx] = array[i]
			array[i] = itemAtIdx
	}
	return array.slice(0,5)
}

let start = performance.now()

(async () => {
	for (let batch = 0; batch < 10000; batch++) {
		let products = []
		for (var productCount = 1; productCount < 1000; productCount++) {
			let newProduct = {
				id: productCount,
				name: faker.faker.commerce.productName(),
				itemNumber: productCount,
				reviewRate: faker.random.number({ min: 0, max: 5 }),
				reviewNum: faker.random.number({ min: 1, max: 3500 }),
				questionNum: faker.random.number({ min: 1, max: 100 }),
				aswerNum: faker.random.number({ min: 1, max: 100 }),
				stockAmount: faker.random.number({ min: 1, max: 999 }),
				sellLimit: faker.random.number({ min: 1, max: 10 }),
				lowestPrice: faker.random.number({ min: 5, max: 3000, precision: 0.01 }).toFixed(2),
				logoOverlay: faker.image.imageUrl(),
				stockStatus: faker.random.number({ min: 0, max: 1 }),
				sellFrom: faker.address.country(),
				shipOrigin: faker.company.companyName(),
				images: shuffle(images),
				descriptionBullet: faker.lorem.sentence().split(' '),
				categoryName: faker.lorem.sentence().split(' '), 
				options: faker.lorem.sentence().split(' ')
			}
			products.push(newProduct)
		}
		await Product.insertMany(products)
	}
  let end = performance.now()
  let timeTaken = (end - start) / 1000
	console.log('timeTaken (sec): ', timeTaken)
})()
