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
  type VARCHAR(25),
  imageURL VARCHAR(50),
  restaurantURL VARCHAR,
  owner_ID INTEGER,
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
