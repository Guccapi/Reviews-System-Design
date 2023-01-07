-- CREATE DATABASE guccirr;

-- DROP TABLE IF EXISTS "review" CASCADE;
-- DROP TABLE IF EXISTS "productmeta" CASCADE;
-- DROP TABLE IF EXISTS "characteristic" CASCADE;
-- DROP TABLE IF EXISTS "staging_table" CASCADE;

CREATE TABLE "review" (
	"review_id" serial NOT NULL,
	"product_id" int NOT NULL,
	"rating" int,
	"date" timestamptz NOT NULL,
	"summary" TEXT NOT NULL,
	"body" TEXT NOT NULL,
	"reported" BOOLEAN NOT NULL DEFAULT false,
	"reviewer_name" varchar(60) NOT NULL,
	"reviewer_email" varchar(60) NOT NULL,
	"response" TEXT,
	"helpfulness" int NOT NULL DEFAULT 0,
	"photos" jsonb DEFAULT '[]',
	CONSTRAINT "review_pk" PRIMARY KEY ("review_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "productmeta" (
	"product_id" serial NOT NULL,
	"ratings" jsonb DEFAULT '{}',
	"recommend" jsonb DEFAULT '{}',
	"charcount" int NOT NULL DEFAULT 0,
	CONSTRAINT "productmeta_pk" PRIMARY KEY ("product_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "characteristic" (
	"id" serial NOT NULL,
	"characteristic_name" varchar(10) NOT NULL,
	"product_id" int NOT NULL,
	"value" int NOT NULL DEFAULT 0,
	CONSTRAINT "characteristic_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

SELECT setval(pg_get_serial_sequence('review', 'review_id'), (SELECT MAX(review_id) FROM review)+1);
SELECT setval(pg_get_serial_sequence('productmeta', 'product_id'), (SELECT MAX(product_id) FROM productmeta)+1);
SELECT setval(pg_get_serial_sequence('characteristic', 'id'), (SELECT MAX(id) FROM characteristic)+1);

CREATE INDEX product_id_index ON review (product_id);

CREATE INDEX reported_index ON review (reported);

CREATE INDEX product_id_index ON characteristic (product_id);

CREATE TABLE "staging_table" (
  id SERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value INT
);

-- COPY staging_table
-- FROM '/home/moakbari/hackreactor/Projects/Reviews-System-Design/server/ETL/CSVS/characteristic_reviews.csv'
-- DELIMITER ','
-- CSV HEADER;

-- UPDATE characteristic
-- 	set value = st.value
-- from staging_table st
-- where st.characteristic_id = characteristic.id;