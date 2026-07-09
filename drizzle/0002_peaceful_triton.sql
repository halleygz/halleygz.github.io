ALTER TABLE "experiences" ADD COLUMN "stage" text DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "profile_content" ADD COLUMN "stage" text DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "stage" text DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "stage" text DEFAULT 'draft' NOT NULL;