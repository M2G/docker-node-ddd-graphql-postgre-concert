DROP TABLE IF EXISTS concerts;
DROP TABLE IF EXISTS artists;

--CREATE INDEX concerts_concert_id_idx ON concerts (id);

CREATE TABLE concerts (
  concert_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type TEXT,
  uri TEXT,
  displayName TEXT,
  status TEXT,
  popularity double precision,
  datetime TEXT,
  city TEXT,
  lng double precision,
  lat double precision
);

CREATE TABLE artists (
  uri TEXT,
  displayName TEXT,
  concert_id INT,
  artist_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   CONSTRAINT fk_concert
      FOREIGN KEY(concert_id)
    REFERENCES concerts(concert_id)
);
