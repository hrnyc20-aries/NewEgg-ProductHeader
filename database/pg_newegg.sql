DROP DATABASE IF EXISTS newegg;

CREATE DATABASE newegg;
\c newegg

CREATE SCHEMA newegg;

CREATE TABLE category(
  id INTEGER NOT NULL,
  categoryName TEXT,
  id_product INTEGER NOT NULL
);
CREATE TABLE description(
	id INTEGER NOT NULL PRIMARY KEY,
	descriptionBullet TEXT,
	id_product INTEGER NOT NULL
);
CREATE TABLE image(
	id INTEGER NOT NULL PRIMARY KEY,
	imgSrc TEXT,
	id_product INTEGER NOT NULL
);
CREATE TABLE option(
	id INTEGER NOT NULL PRIMARY KEY,
	options TEXT,
	id_category INTEGER NOT NULL
);
CREATE TABLE product(
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT,
  itemNumber INTEGER NOT NULL,
  reviewRate DECIMAL(2,1),
  reviewNum INTEGER NOT NULL,
  questionNum INTEGER NOT NULL,
  answersNum INTEGER NOT NULL,
  stockAmount INTEGER NOT NULL,
  sellLimit INTEGER NOT NULL,
  lowestPrice REAL NOT NULL,
  logoOverlay VARCHAR,
  stockStatus INTEGER NOT NULL,
  sellFrom TEXT,
  shipOrigin TEXT
);
