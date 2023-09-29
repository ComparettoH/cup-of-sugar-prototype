-- Create database name cup_of_sugar

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


CREATE TABLE "user" (
	"id" serial NOT NULL,
	"name" varchar(80) NOT NULL,
	"password" varchar(100) NOT NULL UNIQUE,
	"homemade_pref" BOOLEAN NOT NULL,
	"group_id" integer NOT NULL,
	"about" TEXT NOT NULL,
	"imgpath" varchar(200) NOT NULL,
	"role" integer NOT NULL,
	"allergies" varchar(400) NOT NULL,
	"dietary_restrictions" varchar(400) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "requests" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"item_name" varchar(80) NOT NULL,
	"description" TEXT NOT NULL,
	"homemade" BOOLEAN NOT NULL,
	"requested_on" TIMESTAMP NOT NULL,
	"fulfilled_by_user" integer NOT NULL,
	"fulfilled_on" TIMESTAMP NOT NULL,
	CONSTRAINT "requests_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "offers" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"item_name" varchar(80) NOT NULL,
	"description" TEXT NOT NULL,
	"homemade" BOOLEAN NOT NULL,
	"imgpath" varchar(100) NOT NULL,
	"claimed_by_user" integer NOT NULL,
	"claimed_on" TIMESTAMP NOT NULL,
	CONSTRAINT "offers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "group" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"share_location" varchar(100) NOT NULL,
	CONSTRAINT "group_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"type" varchar(80) NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "allergies" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"type" varchar(80) NOT NULL,
	CONSTRAINT "allergies_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "dietary_restrictions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"type" varchar(80) NOT NULL,
	CONSTRAINT "dietary_restrictions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("group_id") REFERENCES "group"("id");

ALTER TABLE "requests" ADD CONSTRAINT "requests_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "requests" ADD CONSTRAINT "requests_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");
ALTER TABLE "requests" ADD CONSTRAINT "requests_fk2" FOREIGN KEY ("fulfilled_by_user") REFERENCES "user"("id");

ALTER TABLE "offers" ADD CONSTRAINT "offers_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "offers" ADD CONSTRAINT "offers_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");
ALTER TABLE "offers" ADD CONSTRAINT "offers_fk2" FOREIGN KEY ("claimed_by_user") REFERENCES "user"("id");



ALTER TABLE "allergies" ADD CONSTRAINT "allergies_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "dietary_restrictions" ADD CONSTRAINT "dietary_restrictions_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");