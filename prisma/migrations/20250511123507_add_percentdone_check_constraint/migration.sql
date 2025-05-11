-- AlterTable
ALTER TABLE "TaskCompletionLog" ALTER COLUMN "percent_done" SET DEFAULT 0;
ALTER TABLE "TaskCompletionLog"
  ADD CONSTRAINT "percent_done_check" CHECK (percent_done >= 0 AND percent_done <= 100);