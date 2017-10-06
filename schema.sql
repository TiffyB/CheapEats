-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Deals'
-- 
-- ---
DROP DATABASE IF EXISTS cheapeats;

CREATE DATABASE cheapeats;

DROP TABLE IF EXISTS Deals cascade;
		
CREATE SEQUENCE IF NOT EXISTS Deals_seq;

CREATE TABLE Deals (
  id INTEGER NOT NULL DEFAULT NEXTVAL ('Deals_seq'),
  yelp_ID INTEGER,
  price DECIMAL(3, 2),
  dealName VARCHAR(50),
  description TEXT,
  imageURL VARCHAR(100),
  startDate DATE,
  startTime TIME,
  endDate DATE,
  endTime TIME,
  PRIMARY KEY (id)
);

-- ---
-- Table 'CheapItems'
-- 
-- ---

DROP TABLE IF EXISTS CheapItems cascade;
		
CREATE SEQUENCE IF NOT EXISTS CheapItems_seq;

CREATE TABLE CheapItems (
  id INTEGER NOT NULL DEFAULT NEXTVAL ('CheapItems_seq'),
  yelp_ID INTEGER,
  price DECIMAL(3, 2),
  menuItem VARCHAR(100),
  imageURL VARCHAR(100),
  description TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Owners'
-- 
-- ---

DROP TABLE IF EXISTS Owners cascade;
		
CREATE SEQUENCE IF NOT EXISTS Owners_seq;

CREATE TABLE Owners (
  id INTEGER NOT NULL DEFAULT NEXTVAL ('Owners_seq'),
  login CHAR(30),
  password CHAR(60),
  PRIMARY KEY (id)
);

-- ---
-- Table 'YelpData'
-- 
-- ---

DROP TABLE IF EXISTS YelpData cascade;
		
CREATE SEQUENCE IF NOT EXISTS YelpData_seq;

CREATE TABLE YelpData (
  id INTEGER NOT NULL DEFAULT NEXTVAL ('YelpData_seq'),
  yelp_api_ID VARCHAR(100),
  address TEXT,
  ZIP INTEGER,
  type VARCHAR(100),
  imageURL VARCHAR,
  restaurantURL VARCHAR,
  owner_ID INTEGER,
  name VARCHAR(50),
  PRIMARY KEY (id)
);

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS Users cascade;
		
CREATE SEQUENCE IF NOT EXISTS Users_seq;

CREATE TABLE Users (
  id INTEGER NOT NULL DEFAULT NEXTVAL ('Users_seq'),
  login VARCHAR(30),
  password VARCHAR(60),
  cheapitem_id INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE Deals ADD FOREIGN KEY (yelp_ID) REFERENCES YelpData (id);
ALTER TABLE CheapItems ADD FOREIGN KEY (yelp_ID) REFERENCES YelpData (id);
ALTER TABLE YelpData ADD FOREIGN KEY (owner_ID) REFERENCES Owners (id);
ALTER TABLE Users ADD FOREIGN KEY (cheapitem_id) REFERENCES CheapItems (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Deals` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `CheapItems` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Owners` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `YelpData` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Deals` (yelp_ID, price, dealName, description, imageURL, startTime, startDate, endTime, endDate) VALUES
-- (1, 5.00, 'Half-Priced Mixt Ceasar','romaine hearts, shaved parmesan, avocado, seasonal radish, garlic herb croutons, savory herbs, caesar dressing','https://s3-media3.fl.yelpcdn.com/bphoto/DOAvz0pcghE07_Kopl1icg/o.jpg','','','');

INSERT INTO Owners (login, password) VALUES
('restaurant1','salad');


INSERT INTO YelpData (yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name, owner_ID) VALUES
('mixt-san-francisco-9','51 Yerba Buena Ln\nSan Francisco, CA 94103', 94103,'Salad, American (New), Vegetarian','https://s3-media3.fl.yelpcdn.com/bphoto/DOAvz0pcghE07_Kopl1icg/o.jpg','https://www.yelp.com/biz/mixt-san-francisco-9?adjust_creative=EF98aLeuaj_agomwLZqxkA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=EF98aLeuaj_agomwLZqxkA','Mixt', 1);

INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description) VALUES
(1, 9.95,'Mixt Ceasar','https://s3-media3.fl.yelpcdn.com/bphoto/hLZDGlGqjPZRAKmgN87v0A/o.jpg','romaine hearts, shaved parmesan, avocado, seasonal radish, garlic herb croutons, savory herbs, caesar dressing');


INSERT INTO Users (login, password, cheapitem_id) VALUES
('someguy','password1234', 1);
