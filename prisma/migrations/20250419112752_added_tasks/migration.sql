-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "TaskDifficulty" AS ENUM ('EASY', 'MODERATE', 'CHALLENGING', 'DIFFICULT');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED', 'STALE');

-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('WATERING', 'FERTILIZING', 'HARVESTING', 'PRUNING', 'WEEDING', 'PLANTING', 'MAINTENANCE', 'PEST_CONTROL', 'RELOCATING', 'SOIL_CARE', 'MONITORING', 'OTHER');

-- CreateTable
CREATE TABLE "Task" (
    "task_id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "category" "TaskCategory" NOT NULL,
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "difficulty" "TaskDifficulty" NOT NULL DEFAULT 'MODERATE',
    "estimated_minutes" INTEGER,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3) NOT NULL,
    "date_completed" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "garden_id" INTEGER,
    "container_id" INTEGER,
    "container_plant_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_recurring" BOOLEAN NOT NULL DEFAULT false,
    "parent_task_id" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "TaskPrerequisite" (
    "prerequisite_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "prerequisite_task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskPrerequisite_pkey" PRIMARY KEY ("prerequisite_id")
);

-- CreateTable
CREATE TABLE "TaskNote" (
    "note_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskNote_pkey" PRIMARY KEY ("note_id")
);

-- CreateTable
CREATE TABLE "TaskCompletionLog" (
    "log_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "percent_done" INTEGER,
    "time_spent_minutes" INTEGER,

    CONSTRAINT "TaskCompletionLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "RecurringTaskPattern" (
    "pattern_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "end_after_count" INTEGER,
    "end_by_date" TIMESTAMP(3),
    "days_of_week" TEXT,
    "day_of_month" INTEGER,
    "month_of_year" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecurringTaskPattern_pkey" PRIMARY KEY ("pattern_id")
);

-- CreateTable
CREATE TABLE "TaskNotification" (
    "notification_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskNotification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateIndex
CREATE INDEX "Task_user_id_idx" ON "Task"("user_id");

-- CreateIndex
CREATE INDEX "Task_garden_id_idx" ON "Task"("garden_id");

-- CreateIndex
CREATE INDEX "Task_container_id_idx" ON "Task"("container_id");

-- CreateIndex
CREATE INDEX "Task_container_plant_id_idx" ON "Task"("container_plant_id");

-- CreateIndex
CREATE INDEX "Task_parent_task_id_idx" ON "Task"("parent_task_id");

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "Task"("status");

-- CreateIndex
CREATE INDEX "Task_end_date_idx" ON "Task"("end_date");

-- CreateIndex
CREATE INDEX "TaskPrerequisite_task_id_idx" ON "TaskPrerequisite"("task_id");

-- CreateIndex
CREATE INDEX "TaskPrerequisite_prerequisite_task_id_idx" ON "TaskPrerequisite"("prerequisite_task_id");

-- CreateIndex
CREATE UNIQUE INDEX "TaskPrerequisite_task_id_prerequisite_task_id_key" ON "TaskPrerequisite"("task_id", "prerequisite_task_id");

-- CreateIndex
CREATE INDEX "TaskNote_task_id_idx" ON "TaskNote"("task_id");

-- CreateIndex
CREATE INDEX "TaskNote_user_id_idx" ON "TaskNote"("user_id");

-- CreateIndex
CREATE INDEX "TaskCompletionLog_task_id_idx" ON "TaskCompletionLog"("task_id");

-- CreateIndex
CREATE INDEX "TaskCompletionLog_user_id_idx" ON "TaskCompletionLog"("user_id");

-- CreateIndex
CREATE INDEX "TaskCompletionLog_completed_at_idx" ON "TaskCompletionLog"("completed_at");

-- CreateIndex
CREATE UNIQUE INDEX "RecurringTaskPattern_task_id_key" ON "RecurringTaskPattern"("task_id");

-- CreateIndex
CREATE INDEX "RecurringTaskPattern_task_id_idx" ON "RecurringTaskPattern"("task_id");

-- CreateIndex
CREATE INDEX "TaskNotification_task_id_idx" ON "TaskNotification"("task_id");

-- CreateIndex
CREATE INDEX "TaskNotification_user_id_idx" ON "TaskNotification"("user_id");

-- CreateIndex
CREATE INDEX "TaskNotification_is_read_idx" ON "TaskNotification"("is_read");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_garden_id_fkey" FOREIGN KEY ("garden_id") REFERENCES "Garden"("garden_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_container_id_fkey" FOREIGN KEY ("container_id") REFERENCES "Container"("container_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_container_plant_id_fkey" FOREIGN KEY ("container_plant_id") REFERENCES "ContainerPlant"("container_plant_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_parent_task_id_fkey" FOREIGN KEY ("parent_task_id") REFERENCES "Task"("task_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskPrerequisite" ADD CONSTRAINT "TaskPrerequisite_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskPrerequisite" ADD CONSTRAINT "TaskPrerequisite_prerequisite_task_id_fkey" FOREIGN KEY ("prerequisite_task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskNote" ADD CONSTRAINT "TaskNote_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskNote" ADD CONSTRAINT "TaskNote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCompletionLog" ADD CONSTRAINT "TaskCompletionLog_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCompletionLog" ADD CONSTRAINT "TaskCompletionLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringTaskPattern" ADD CONSTRAINT "RecurringTaskPattern_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskNotification" ADD CONSTRAINT "TaskNotification_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskNotification" ADD CONSTRAINT "TaskNotification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
