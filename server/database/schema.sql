DROP TABLE IF EXISTS "Product Info";

CREATE TABLE "Product Info" (
	"Product_id" serial NOT NULL,
	"Review_id" int NOT NULL,
	CONSTRAINT "Product Info_pk" PRIMARY KEY ("Product_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "Reviews";

CREATE TABLE "Reviews" (
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
	CONSTRAINT "Reviews_pk" PRIMARY KEY ("review_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "Product Meta";

CREATE TABLE "Product Meta" (
	"product_id" serial NOT NULL,
	"ratings" jsonb NOT NULL,
	"recommended" jsonb NOT NULL,
	"Characteristics" jsonb NOT NULL,
	CONSTRAINT "Product Meta_pk" PRIMARY KEY ("product_id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "Product Info" ADD CONSTRAINT "Product Info_fk0" FOREIGN KEY ("Review_id") REFERENCES "Reviews"("review_id");

ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_fk0" FOREIGN KEY ("product_id") REFERENCES "Product Info"("Product_id");

ALTER TABLE "Product Meta" ADD CONSTRAINT "Product Meta_fk0" FOREIGN KEY ("product_id") REFERENCES "Product Info"("Product_id");



