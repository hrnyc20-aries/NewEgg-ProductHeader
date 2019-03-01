var faker = require("faker");

let counter = 1;


let generation = function() {
  let output = [];

  for (let i = 1; i < 101; i++) {
    output.push({
      itemNumber: i,
      incrementor: i,
      productName: faker.commerce.productName(),
      images: multipleImg(),
      logoImg: faker.image.imageUrl(),
      reviewRate: getRandomInt(0, 5),
      reviewNum: getRandomInt(0, 300),
      questionNum: 0,
      answerNum: 0,
      stockAmount: getRandomInt(2, 20), //random generattion
      sellLimit: 2,
      lowestPrice: faker.commerce.price(), //random generator price
      stockStatus: 1, // 1 is true, 0 is false, else is false
      sellFrom: shipOrigin(), // random picker for multiple countries
      shipOrigin: "newegg",

      categories: categoryName(),
      // nest options into categories
      /**
       * categories: {categoryIterator: 1,
       *              category: "lorem ipsum",
       *              options: [{catID: 1
       *                         options: lorem ipsum},
       *                        {catID: 1,
       *                         options: lorem decorum},
       *                        {catID: 1,
       *                         options: duro locum}]}
       */

      description: descriptionBullets()
    });
  }
  return output;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// multiple image function
let multipleImg = function() {
  let output = [];
  for (let i = 1; i < 5; i++) {
    output.push({
      image: faker.image.imageUrl()
    });
  }
  return output;
};

// variation function, for different amount of images // NOPE
// variation function, for different amount of product description bullets //NOPE

let categoryName = function() {
  let output = [];

  //random number between 1-7 for for loop upper limit
  for (let i = 1; i < getRandomInt(1, 4); i++) {
    output.push({
      categoryIterator: i,
      category: faker.lorem.word(),
      options: optionCategories(counter)
    });
    counter++
  }
  // color
  // model
  return output;
};

let optionCategories = function(categoryID) {

  let output = [];
  for (let i = 1; i < getRandomInt(3,7); i++) {
    output.push({
      categoryId: categoryID,
      singleOption: faker.lorem.word()
    })
  }
  return output
}

let descriptionBullets = function() {
  let output = [];
  for (let i = 1; i < getRandomInt(3, 5); i++) {
    output.push({ bullet: faker.lorem.sentence() });
  }
  return output;
};

let shipOrigin = function() {
  let array = ["mexico", "canada", "united states of america"];
  return array[getRandomInt(0, 2)];
};

module.exports = generation();
