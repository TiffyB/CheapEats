-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Deals'
-- 
-- ---

DROP TABLE IF EXISTS Deals;
		
CREATE SEQUENCE Deals_seq;

CREATE TABLE Deals (
  id INTEGER NULL DEFAULT NEXTVAL ('Deals_seq') DEFAULT NULL,
  yelp_ID INTEGER NULL DEFAULT NULL,
  price DECIMAL(3, 2) NOT NULL DEFAULT NULL,
  dealName VARCHAR(50) NOT NULL DEFAULT 'NULL',
  description MEDIUMTEXT(250) NULL DEFAULT 'NULL',
  imageURL VARCHAR(100) NOT NULL DEFAULT 'NULL',
  startTime DATETIME(100) NOT NULL DEFAULT 'NULL',
  endTime DATETIME(100) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (id)
);

-- ---
-- Table 'CheapItems'
-- 
-- ---

DROP TABLE IF EXISTS CheapItems;
		
CREATE SEQUENCE CheapItems_seq;

CREATE TABLE CheapItems (
  id INTEGER NULL DEFAULT NEXTVAL ('CheapItems_seq') DEFAULT NULL,
  yelp_ID INTEGER NULL DEFAULT NULL,
  price DECIMAL(3, 2) NOT NULL DEFAULT NULL,
  menuItem VARCHAR(100) NOT NULL DEFAULT 'NULL',
  imageURL VARCHAR(100) NULL DEFAULT 'NULL',
  description MEDIUMTEXT(250) NULL DEFAULT 'NULL',
  PRIMARY KEY (id)
);

-- ---
-- Table 'Owners'
-- 
-- ---

DROP TABLE IF EXISTS Owners;
		
CREATE SEQUENCE Owners_seq;

CREATE TABLE Owners (
  id INTEGER NULL DEFAULT NEXTVAL ('Owners_seq') DEFAULT NULL,
  login CHAR(30) NOT NULL DEFAULT 'NULL',
  password CHAR(60) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (id)
);

-- ---
-- Table 'YelpData'
-- 
-- ---

DROP TABLE IF EXISTS YelpData;
		
CREATE SEQUENCE YelpData_seq;

CREATE TABLE YelpData (
  id INTEGER NULL DEFAULT NEXTVAL ('YelpData_seq') DEFAULT NULL,
  yelp_api_ID VARCHAR(100) NOT NULL DEFAULT NULL,
  address MEDIUMTEXT(50) NOT NULL DEFAULT 'NULL',
  ZIP CAST(5 AS INT) NOT NULL DEFAULT NULL,
  type VARCHAR(25) NOT NULL DEFAULT 'NULL',
  imageURL VARCHAR(50) NULL DEFAULT 'NULL',
  restaurantURL VARCHAR NULL DEFAULT 'NULL',
  owner_ID INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS Users;
		
CREATE SEQUENCE Users_seq;

CREATE TABLE Users (
  id INTEGER NULL DEFAULT NEXTVAL ('Users_seq') DEFAULT NULL,
  login VARCHAR(30) NOT NULL,
  password VARCHAR(60) NOT NULL,
  cheapitem_id INTEGER NULL DEFAULT NULL,
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

-- INSERT INTO `Deals` (`id`,`yelp_ID`,`price`,`dealName`,`description`,`imageURL`,`startTime`,`endTime`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `CheapItems` (`id`,`yelp_ID`,`price`,`menuItem`,`imageURL`,`description`) VALUES
-- ('','','','','','');
-- INSERT INTO `Owners` (`id`,`login`,`password`) VALUES
-- ('','','');
-- INSERT INTO `YelpData` (`id`,`address`,`ZIP`,`type`,`imageURL`,`restaurantURL`,`owner_ID`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Users` (`id`,`login`,`password`,`cheapitem_id`) VALUES
-- ('','','','');
