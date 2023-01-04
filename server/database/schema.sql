DROP TABLE IF EXISTS "review" CASCADE;

CREATE TABLE "review" (
	"review_id" int NOT NULL,
	"product_id" int NOT NULL,
	"rating" int NOT NULL,
	"date" timestamptz NOT NULL,
	"summary" TEXT NOT NULL,
	"body" TEXT NOT NULL,
	"recommend" TEXT NOT NULL,
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

-- DROP TABLE IF EXISTS "productmeta" CASCADE;

CREATE TABLE "productmeta" (
	"product_id" int NOT NULL,
	"ratings" jsonb DEFAULT '{}',
	"recommend" jsonb DEFAULT '{}',
	"charcount" int NOT NULL DEFAULT 0,
	CONSTRAINT "productmeta_pk" PRIMARY KEY ("product_id")
) WITH (
  OIDS=FALSE
);

-- DROP TABLE IF EXISTS "characteristic" CASCADE;

CREATE TABLE "characteristic" (
	"id" bigint NOT NULL,
	"characteristic_name" varchar(10) NOT NULL,
	"product_id" bigint NOT NULL,
	"value" bigint NOT NULL DEFAULT 0,
	CONSTRAINT "characteristic_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- CREATE INDEX characteristic_id_index ON characteristic (id);

-- CREATE INDEX productmeta_id_index ON productmeta (product_id);

-- CREATE INDEX review_id_index ON review (review_id);





