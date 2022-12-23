DROP TABLE IF EXISTS "productinfo" CASCADE;

CREATE TABLE "productinfo" (
	"Product_id" serial NOT NULL,
	"Review_id" int NOT NULL,
	CONSTRAINT "Product Info_pk" PRIMARY KEY ("Product_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "review" CASCADE;

CREATE TABLE "review" (
	"review_id" serial NOT NULL,
	"rating" serial NOT NULL,
	"summary" serial NOT NULL,
	"recommended" serial NOT NULL,
	"response" serial NOT NULL,
	"body" TEXT NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"reviewer_name" varchar(60) NOT NULL,
	"helpfulness" int NOT NULL,
	"photos" jsonb NOT NULL,
	"reported" BOOLEAN NOT NULL,
	"product_id" int NOT NULL,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("review_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "productmeta" CASCADE;

CREATE TABLE "productmeta" (
	"product_id" serial NOT NULL,
	"ratings" jsonb NOT NULL,
	"recommended" jsonb NOT NULL,
	"Characteristics" jsonb NOT NULL,
	CONSTRAINT "Product Meta_pk" PRIMARY KEY ("product_id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "productinfo" ADD CONSTRAINT "productinfo_fk0" FOREIGN KEY ("Review_id") REFERENCES "review"("review_id");

ALTER TABLE "review" ADD CONSTRAINT "review_fk0" FOREIGN KEY ("product_id") REFERENCES "productinfo"("Product_id");

ALTER TABLE "productmeta" ADD CONSTRAINT "productmeta_fk0" FOREIGN KEY ("product_id") REFERENCES "productinfo"("Product_id");



