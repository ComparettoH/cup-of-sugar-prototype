-- Create database name cup_of_sugar

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "group" (
    id SERIAL PRIMARY KEY,
    group_name varchar(50) NOT NULL,
    share_location varchar(100) NOT NULL
);

CREATE TABLE "user" (
  	id SERIAL PRIMARY KEY,
    username varchar(80) NOT NULL,
    password varchar(1000) NOT NULL,
    group_id integer NOT NULL,
    FOREIGN KEY (group_id) REFERENCES "group" (id),
    UNIQUE (username)
);

CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    name varchar(80) NOT NULL,
    homemade_pref boolean NOT NULL,
    about text,
    imgpath varchar(200),
    role integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_type varchar(80) NOT NULL
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    group_id integer NOT NULL,
    category_id integer NOT NULL,
    item_name varchar(80) NOT NULL,
    description text NOT NULL,
    requested_on date NOT NULL,
    expires_on timestamp NOT NULL,
    fulfilled_on timestamp,
    fulfilled_by_user integer,
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (group_id) REFERENCES "group" (id),
    FOREIGN KEY (category_id) REFERENCES categories (id),
    FOREIGN KEY (fulfilled_by_user) REFERENCES "user" (id)
);

CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    group_id integer NOT NULL,
    category_id integer NOT NULL,
    item_name varchar(80) NOT NULL,
    description text NOT NULL,
    homemade boolean NOT NULL,
    imgpath varchar(100),
    offered_on date NOT NULL,
    expires_on timestamp NOT NULL,
    claimed_on timestamp,
    claimed_by_user integer,
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (group_id) REFERENCES "group" (id),
    FOREIGN KEY (category_id) REFERENCES categories (id),
    FOREIGN KEY (claimed_by_user) REFERENCES "user" (id)
);

CREATE TABLE allergies (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    allergy_type varchar(80) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE dietary_restrictions (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    restriction_type varchar(80) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

INSERT INTO "group" (group_name, share_location)
VALUES ('Cup of Sugar Team', 'Prime Commons'), 
('Elm Apartments', 'Rec Room')
;