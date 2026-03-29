ALTER TABLE "favourite" ADD COLUMN "status" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "favourite" ADD COLUMN "created_at" timestamp DEFAULT now();

UPDATE "favourite" SET "status" = true, "created_at"=now()