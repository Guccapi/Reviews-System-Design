DROP TABLE IF EXISTS "review" CASCADE;

CREATE TABLE "review" (
	"review_id" int NOT NULL,
	"product_id" int NOT NULL,
	"rating" int NOT NULL,
	"date" timestamptz NOT NULL,
	"summary" TEXT NOT NULL,
	"body" TEXT NOT NULL,
	"recommend" TEXT NOT NULL,
	"reported" BOOLEAN NOT NULL,
	"reviewer_name" varchar(60) NOT NULL,
	"reviewer_email" varchar(60) NOT NULL,
	"response" TEXT,
	"helpfulness" int NOT NULL,
	"photos" jsonb,
	CONSTRAINT "review_pk" PRIMARY KEY ("review_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "productmeta" CASCADE;

CREATE TABLE "productmeta" (
	"product_id" int NOT NULL,
	"ratings" jsonb,
	"recommend" jsonb,
	"characteristics" jsonb NOT NULL,
	CONSTRAINT "productmeta_pk" PRIMARY KEY ("product_id")
) WITH (
  OIDS=FALSE
);


