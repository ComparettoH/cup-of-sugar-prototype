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
    password varchar(20) NOT NULL,
    group_id integer NOT NULL,
    FOREIGN KEY (group_id) REFERENCES "group" (id),
    UNIQUE (username)
);

CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    name varchar(80) NOT NULL,
    homemade_pref boolean NOT NULL,
    about text NOT NULL,
    imgpath varchar(200) NOT NULL,
    role integer NOT NULL,
    UNIQUE (user_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_type varchar(80) NOT NULL
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    item_name varchar(80) NOT NULL,
    description text NOT NULL,
    homemade boolean NOT NULL,
    requested_on timestamp NOT NULL,
    fulfilled_by_user integer NOT NULL,
    fulfilled_on timestamp NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_profile (user_id),
    FOREIGN KEY (category_id) REFERENCES categories (id),
    FOREIGN KEY (fulfilled_by_user) REFERENCES user_profile (user_id)
);

CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    item_name varchar(80) NOT NULL,
    description text NOT NULL,
    homemade boolean NOT NULL,
    imgpath varchar(100) NOT NULL,
    claimed_by_user integer NOT NULL,
    claimed_on timestamp NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_profile (user_id),
    FOREIGN KEY (category_id) REFERENCES categories (id),
    FOREIGN KEY (claimed_by_user) REFERENCES user_profile (user_id)
);

CREATE TABLE allergies (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    allergy_type varchar(80) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_profile (user_id)
);

CREATE TABLE dietary_restrictions (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    restriction_type varchar(80) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_profile (user_id)
);