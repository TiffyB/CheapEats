
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Deals'
-- 
-- ---

DROP TABLE IF EXISTS Deals cascade;
DROP SEQUENCE IF EXISTS Deals_seq;
CREATE SEQUENCE Deals_seq;

CREATE TABLE Deals (
  id INTEGER NOT NULL DEFAULT NEXTVAL ('Deals_seq'),
  yelp_ID INTEGER,
  price DECIMAL(4, 2),
  dealName VARCHAR(50),
  description TEXT,
  imageURL VARCHAR(150),
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
DROP SEQUENCE IF EXISTS CheapItems_seq;
CREATE SEQUENCE CheapItems_seq;

CREATE TABLE CheapItems (
  id INTEGER NOT NULL DEFAULT NEXTVAL ('CheapItems_seq'),
  yelp_ID INTEGER,
  price DECIMAL(4, 2),
  menuItem VARCHAR(100),
  imageURL VARCHAR(150),
  description TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Owners'
-- 
-- ---

DROP TABLE IF EXISTS Owners cascade;
DROP SEQUENCE IF EXISTS Owners_seq;
CREATE SEQUENCE Owners_seq;

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
DROP SEQUENCE IF EXISTS YelpData_seq;
CREATE SEQUENCE YelpData_seq;

CREATE TABLE YelpData (
  id INTEGER NOT NULL DEFAULT NEXTVAL ('YelpData_seq'),
  yelp_api_ID VARCHAR(100),
  address TEXT,
  ZIP INTEGER,
  type VARCHAR(100),
  imageURL VARCHAR,
  restaurantURL VARCHAR,
  owner_ID INTEGER,
  name VARCHAR,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS Users cascade;
DROP SEQUENCE IF EXISTS Users_seq;
CREATE SEQUENCE Users_seq;

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
('restaurant1','$2a$10$VLA2V0KBahnfNWIeNmxzcedn8bZnEPOcVi8N.hNemdj6NwqQ7pdRq');
-- hashed value of 'salad' = '$2a$10$SPAvAmjR4FRlxJAGye98Uey.EdyOT1FXt2YMWevBzXU6mQ36QSJv2'

INSERT INTO Owners (login, password) VALUES
('tselogs', '$2a$10$x.IUhaGbZkL8osWcf7B3eOAzeK/wCY6VAIljqB1P5fZ8er.hH0HaG');
-- hashed value of 'filipinofood' = '$2a$10$U83U3c0lPsWleoAOgLZGjOXc1oM.CqaoINjB3gJOPMSEjrFB206oO'

INSERT INTO YelpData (yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name, owner_ID) VALUES
('mixt-san-francisco-9','51 Yerba Buena Ln\nSan Francisco, CA 94103', 94103,'Salad, American (New), Vegetarian','https://s3-media3.fl.yelpcdn.com/bphoto/DOAvz0pcghE07_Kopl1icg/o.jpg','https://www.yelp.com/biz/mixt-san-francisco-9?adjust_creative=EF98aLeuaj_agomwLZqxkA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=EF98aLeuaj_agomwLZqxkA','Mixt', 1);

INSERT INTO YelpData (yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name, owner_ID) VALUES 
('tselogs-san-francisco-5', '552 Jones St\nSan Francisco, CA 94102', 94102, 'Filipino', 'https://s3-media1.fl.yelpcdn.com/bphoto/0lieMPClRsd4XSj_6xkBeA/o.jpg', 'https://www.yelp.com/biz/tselogs-san-francisco-5?adjust_creative=EF98aLeuaj_agomwLZqxkA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=EF98aLeuaj_agomwLZqxkA', 'Tselogs', 2);


INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description) VALUES
(1, 9.95,'Mixt Ceasar','https://s3-media3.fl.yelpcdn.com/bphoto/hLZDGlGqjPZRAKmgN87v0A/o.jpg','romaine hearts, shaved parmesan, avocado, seasonal radish, garlic herb croutons, savory herbs, caesar dressing');

INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description) VALUES
(2, 9.99,'Pancit Bihon','https://s3-media4.fl.yelpcdn.com/bphoto/YDF1elX5vkhGXjv22_kjcw/o.jpg','Rice stick noodles sauteed in pork, shrimp, fishball, with vegetables topped with boiled egg, roasted garlic, green onion and pork rinds');


INSERT INTO Users (login, password, cheapitem_id) VALUES
('someguy','password1234', 1);

INSERT INTO Users (login, password, cheapitem_id) VALUES
('anotherguy','password1234', 2);

-- INSERT INTO Owners (login, password) VALUES
-- ('restaurant1','salad');

-- INSERT INTO Owners (login, password) VALUES
-- ('tselogs', 'filipinofood');

-- INSERT INTO YelpData (yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name, owner_ID) VALUES
-- ('mixt-san-francisco-9','51 Yerba Buena Ln\nSan Francisco, CA 94103', 94103,'Salad, American (New), Vegetarian','https://s3-media3.fl.yelpcdn.com/bphoto/DOAvz0pcghE07_Kopl1icg/o.jpg','https://www.yelp.com/biz/mixt-san-francisco-9?adjust_creative=EF98aLeuaj_agomwLZqxkA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=EF98aLeuaj_agomwLZqxkA','Mixt', 1);

-- INSERT INTO YelpData (yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name, owner_ID) VALUES 
-- ('tselogs-san-francisco-5', '552 Jones St\nSan Francisco, CA 94102', 94102, 'Filipino', 'https://s3-media1.fl.yelpcdn.com/bphoto/0lieMPClRsd4XSj_6xkBeA/o.jpg', 'https://www.yelp.com/biz/tselogs-san-francisco-5?adjust_creative=EF98aLeuaj_agomwLZqxkA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=EF98aLeuaj_agomwLZqxkA', 'Tselogs', 2);


-- INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description) VALUES
-- (1, 9.95,'Mixt Ceasar','https://s3-media3.fl.yelpcdn.com/bphoto/hLZDGlGqjPZRAKmgN87v0A/o.jpg','romaine hearts, shaved parmesan, avocado, seasonal radish, garlic herb croutons, savory herbs, caesar dressing');

-- INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description) VALUES
-- (2, 9.99,'Pancit Bihon','https://s3-media4.fl.yelpcdn.com/bphoto/YDF1elX5vkhGXjv22_kjcw/o.jpg','Rice stick noodles sauteed in pork, shrimp, fishball, with vegetables topped with boiled egg, roasted garlic, green onion and pork rinds');


-- INSERT INTO Users (login, password, cheapitem_id) VALUES
-- ('someguy','password1234', 1);

-- INSERT INTO Users (login, password, cheapitem_id) VALUES
-- ('anotherguy','password1234', 2);

-- INSERT INTO YelpData(yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name)
-- VALUES ('tú-lan-san-francisco-4', '8 6th St', 94103, 'Vietnamese', 'http://bit.ly/2ggP5Rz', 'http://tulan-vn-restaurant.com', 'Tu Lan');
-- INSERT INTO YelpData(yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name)
-- VALUES ('the-flying-falafel-san-francisco-3', '1051 Market St', 94013, 'Vegan', 'http://bit.ly/2xZrTyG', 'http://flyingfalafel.com', 'The Flying Falafel');
-- INSERT INTO YelpData(yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name)
-- VALUES ('box-kitchen-san-francisco', '431 Natoma St.', 94103, 'Burgers', 'http://bit.ly/2ytyFA7', 'http://boxkitchensf.com', 'Box Kitchen');
-- INSERT INTO YelpData(yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name)
-- VALUES ('kaisen-sushi-san-francisco', '71 5th St', 94013, 'Japanese', 'http://bit.ly/2z1PKhB', 'https://www.yelp.com/biz/kaisen-sushi-san-francisco', 'Kaisen Sushi');
-- INSERT INTO YelpData(yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name)
-- VALUES ('dotties-true-blue-cafe-san-francisco', '28 6th St', 94103, 'American', 'http://bit.ly/2fVISxl', 'http://dottiestruebluesf.com', 'Dottie''s True Blue Cafe');
-- INSERT INTO owners (login, password) VALUES ('dottie','2308jgl3sadf');
-- INSERT INTO owners (login, password) VALUES ('tulan', 'b8do983jl');
-- INSERT INTO owners (login, password) VALUES ('tworestaurants', '56j3lkj4');
-- INSERT INTO owners (login, password) VALUES ('kaisen', '10zzpwj5');
-- UPDATE yelpdata SET owner_id = 1 where id = 5;
-- UPDATE yelpdata SET owner_id = 2 where id = 1;
-- UPDATE yelpdata SET owner_id = 3 where id = 2;
-- UPDATE yelpdata SET owner_id = 3 where id = 3;
-- UPDATE yelpdata SET owner_id = 4 where id = 4;
-- INSERT INTO Deals (yelp_ID, price, dealName, description, imageURL, startDate, startTime, endDate, endTime)
-- VALUES (4, 4.00, '$4 Appetizers', 'Gyoza, takoyaki, hand rolls and more!', 'http://bit.ly/2wBXPHY', '2017-10-09', '17:00', '2017-10-09', '19:30');
-- INSERT INTO Deals (yelp_ID, price, dealName, description, imageURL, startDate, startTime, endDate, endTime)
-- VALUES (2, 6.50, '$6.50 Flying Falafel', '$1 off our famous flying falafel pocket sandwich after 2pm', 'http://bit.ly/2xZrTyG', '2017-10-09', '14:00', '2017-10-09', '16:30');
-- INSERT INTO Deals (yelp_ID, price, dealName, description, imageURL, startDate, startTime, endDate, endTime)
-- VALUES (3, 10.50, 'Box Burger Special', 'Until 7pm, sink your teeth into our famous Box Burger with fries or salad for just $10', 'http://bit.ly/2xm26E0', '2017-10-09', '16:00', '2017-10-09', '19:00');
-- INSERT INTO Deals (yelp_ID, price, dealName, description, startDate, startTime, endDate, endTime)
-- VALUES (5, 5.00, 'Muffin & coffee', 'Enjoy one of Dottie''s fresh-baked breakfast treats and coffee.', '2017-10-10', '06:00', '2017-10-10', '08:30');
-- INSERT INTO Deals (yelp_ID, price, dealName, description, startDate, startTime, endDate, endTime)
-- VALUES (1, 7.00, 'Late night noodle soup', 'Any noodle soup only $7 after 8pm tonight', '2017-10-09', '20:00', '2017-10-09', '22:00');
-- INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description)
-- VALUES (2, 6.00, 'Hummus Saucer', 'http://bit.ly/2ys7FAM', 'A bed of hummus dip with veggies and warm pita. Gluten-free.');
-- INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description)
-- VALUES (2, 9.70, 'Super Combo #2: Falafel and organic juice', 'http://bit.ly/2ys7FAM', 'Enjoy our famous falafel pocket or platter with fresh organic juice.');
-- INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description)
-- VALUES (4, 9.00, 'Crunchy Spicy Salmon/Tuna Roll', 'http://bit.ly/2yLzT5D', 'Spicy salmon or tuna roll with avocado and crispy tempura bits.');
-- INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description)
-- VALUES (5, 8.75, 'Eggs, home fries and toast', 'https://s3-media2.fl.yelpcdn.com/bphoto/Xrk1v9TvKTBEOIR3uYW6kg/348s.jpg', 'Two eggs, any way you like, with home fries and toast');
-- INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description)
-- VALUES (5, 8.95, 'Black bean chili and cornbread', 'https://foodtoglow.files.wordpress.com/2011/09/dsc_0024.jpg', 'Vegetarian black bean chili topped with cheese and onions and served with grilled chili-cheddar corn bread');
-- INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description)
-- VALUES (1, 8.95, 'Ginger Chicken', 'http://www.foodhoe.com/wp-content/uploads/2014/01/tulan_gingerchicken2.jpg', 'Vietnamese ginger chicken with steamed rice.');
-- INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description)
-- VALUES (3, 10.00, 'Tempest', 'http://bit.ly/2kq8kfQ', 'Fried egg, cheddar, heirloom tomato, kale, sriracha aioli, english muffin. Served with fries or house salad.');

