CREATE TABLE "lessons" (
	"id" text PRIMARY KEY NOT NULL,
	"subject" text NOT NULL,
	"topic" text NOT NULL,
	"grade" text NOT NULL,
	"introduction" jsonb DEFAULT '{}'::jsonb,
	"sections" jsonb DEFAULT '[]'::jsonb,
	"conclusion" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now()
);
