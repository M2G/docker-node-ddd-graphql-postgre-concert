DROP TABLE IF EXISTS concerts;
DROP TABLE IF EXISTS artists;

CREATE TABLE concerts (
  id bigint,
  type text,
  uri text,
  displayName text,
  start.time text,
  start.date text,
  start.datetime text,
  location.city text,
  location.lng double precision,
  location.lat double precision,
  venue.id bigint,
  venue.displayName text,
  venue.uri text,
  venue.lng double precision,
  venue.lat double precision,
  status text,
  popularity double precision
);

CREATE TABLE artists (
  artist.uri text,
  artist.displayName text,
  artist.id bigint,
  artist.identifier json,
  displayName text,
  billingIndex bigint,
  id bigint,
  billing text
);


INSERT INTO concerts VALUES
(11129128,'Concert','http://www.songkick.com/concerts/11129128-wild-flag-at-fillmore?utm_source=PARTNER_ID&utm_medium=partner','Wild Flag at The Fillmore (April 18, 2012)','20:00:00','2012-04-18','2012-04-18T20:00:00-0800','San Francisco, CA, US',-122.4332937,37.7842398,6239,'The Fillmore','http://www.songkick.com/venues/6239-fillmore?utm_source=PARTNER_ID&utm_medium=partner',-122.4332937,37.7842398,'ok',0.012763);

INSERT INTO "artists" VALUES
('http://www.songkick.com/artists/29835-wild-flag?utm_source=PARTNER_ID&utm_medium=partner','Wild Flag',29835,'[]','Wild Flag',1,21579303,'headline');



CREATE TABLE contacts(
   contact_id INT GENERATED ALWAYS AS IDENTITY,
   customer_id INT,
   contact_name VARCHAR(255) NOT NULL,
   phone VARCHAR(15),
   email VARCHAR(100),
   PRIMARY KEY(contact_id),
   CONSTRAINT fk_customer
      FOREIGN KEY(customer_id)
	  REFERENCES customers(customer_id)
);

DROP TABLE IF EXISTS customers;

CREATE TABLE customers(
   customer_id INT GENERATED ALWAYS AS IDENTITY,
   customer_name VARCHAR(255) NOT NULL,
   PRIMARY KEY(customer_id)
);

CREATE TABLE contacts(
   contact_id INT GENERATED ALWAYS AS IDENTITY,
   customer_id INT,
   contact_name VARCHAR(255) NOT NULL,
   phone VARCHAR(15),
   email VARCHAR(100),
   PRIMARY KEY(contact_id),
   CONSTRAINT fk_customer
      FOREIGN KEY(customer_id)
	  REFERENCES customers(customer_id)
);
