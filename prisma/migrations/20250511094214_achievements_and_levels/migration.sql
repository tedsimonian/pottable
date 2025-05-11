-- CreateTable
CREATE TABLE "UserLevel" (
    "level_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "current_level" INTEGER NOT NULL DEFAULT 1,
    "current_xp" INTEGER NOT NULL DEFAULT 0,
    "total_xp" INTEGER NOT NULL DEFAULT 0,
    "level_title" VARCHAR(100) NOT NULL DEFAULT 'Novice Gardener',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLevel_pkey" PRIMARY KEY ("level_id")
);

-- CreateTable
CREATE TABLE "ExperienceLog" (
    "xp_log_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "source" VARCHAR(100) NOT NULL,
    "source_id" INTEGER,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperienceLog_pkey" PRIMARY KEY ("xp_log_id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "achievement_id" SERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "xp_reward" INTEGER NOT NULL,
    "icon" VARCHAR(100),
    "requirements" JSONB NOT NULL,
    "is_hidden" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("achievement_id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "user_achievement_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "achievement_id" INTEGER NOT NULL,
    "unlocked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" JSONB,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("user_achievement_id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "reward_id" SERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "value" TEXT NOT NULL,
    "icon" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("reward_id")
);

-- CreateTable
CREATE TABLE "UnlockedReward" (
    "unlocked_reward_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "reward_id" INTEGER NOT NULL,
    "unlocked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UnlockedReward_pkey" PRIMARY KEY ("unlocked_reward_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLevel_user_id_key" ON "UserLevel"("user_id");

-- CreateIndex
CREATE INDEX "UserLevel_user_id_idx" ON "UserLevel"("user_id");

-- CreateIndex
CREATE INDEX "ExperienceLog_user_id_idx" ON "ExperienceLog"("user_id");

-- CreateIndex
CREATE INDEX "ExperienceLog_source_source_id_idx" ON "ExperienceLog"("source", "source_id");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_code_key" ON "Achievement"("code");

-- CreateIndex
CREATE INDEX "Achievement_code_idx" ON "Achievement"("code");

-- CreateIndex
CREATE INDEX "Achievement_category_idx" ON "Achievement"("category");

-- CreateIndex
CREATE INDEX "UserAchievement_user_id_idx" ON "UserAchievement"("user_id");

-- CreateIndex
CREATE INDEX "UserAchievement_achievement_id_idx" ON "UserAchievement"("achievement_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_user_id_achievement_id_key" ON "UserAchievement"("user_id", "achievement_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_code_key" ON "Reward"("code");

-- CreateIndex
CREATE INDEX "Reward_code_idx" ON "Reward"("code");

-- CreateIndex
CREATE INDEX "Reward_type_idx" ON "Reward"("type");

-- CreateIndex
CREATE INDEX "UnlockedReward_user_id_idx" ON "UnlockedReward"("user_id");

-- CreateIndex
CREATE INDEX "UnlockedReward_reward_id_idx" ON "UnlockedReward"("reward_id");

-- CreateIndex
CREATE UNIQUE INDEX "UnlockedReward_user_id_reward_id_key" ON "UnlockedReward"("user_id", "reward_id");

-- AddForeignKey
ALTER TABLE "UserLevel" ADD CONSTRAINT "UserLevel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceLog" ADD CONSTRAINT "ExperienceLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "Achievement"("achievement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnlockedReward" ADD CONSTRAINT "UnlockedReward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnlockedReward" ADD CONSTRAINT "UnlockedReward_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "Reward"("reward_id") ON DELETE CASCADE ON UPDATE CASCADE;
