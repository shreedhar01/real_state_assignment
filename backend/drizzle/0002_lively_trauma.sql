ALTER TABLE "properties" RENAME COLUMN "location" TO "area";--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "city" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "province" varchar(255) NOT NULL;