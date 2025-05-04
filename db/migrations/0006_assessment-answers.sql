CREATE TABLE "assessment_question_answers" (
	"id" text PRIMARY KEY NOT NULL,
	"lesson_id" text NOT NULL,
	"answers" jsonb DEFAULT '[]'::jsonb,
	"student_id" text NOT NULL,
	"start_time" timestamp DEFAULT now(),
	"end_time" timestamp
);
