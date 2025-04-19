/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Garden" (
    "garden_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "location" VARCHAR(200),
    "size_sq_feet" DECIMAL(10,2),
    "garden_type" VARCHAR(50),
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Garden_pkey" PRIMARY KEY ("garden_id")
);

-- CreateTable
CREATE TABLE "GardenCondition" (
    "condition_id" SERIAL NOT NULL,
    "garden_id" INTEGER NOT NULL,
    "climate_zone" VARCHAR(50),
    "sunlight_exposure" VARCHAR(50),
    "avg_temperature_f" DECIMAL(5,2),
    "humidity_pct" INTEGER,
    "soil_type" VARCHAR(50),
    "annual_rainfall" DECIMAL(10,2),
    "additional_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GardenCondition_pkey" PRIMARY KEY ("condition_id")
);

-- CreateTable
CREATE TABLE "ContainerType" (
    "type_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "typical_dimensions" TEXT,

    CONSTRAINT "ContainerType_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "Container" (
    "container_id" SERIAL NOT NULL,
    "garden_id" INTEGER NOT NULL,
    "container_type_id" INTEGER NOT NULL,
    "name" VARCHAR(100),
    "material" VARCHAR(50),
    "width_inches" DECIMAL(10,2),
    "length_inches" DECIMAL(10,2),
    "height_inches" DECIMAL(10,2),
    "diameter_inches" DECIMAL(10,2),
    "volume_gallons" DECIMAL(10,2),
    "position_x" DECIMAL(10,2),
    "position_y" DECIMAL(10,2),
    "soil_type" VARCHAR(100),
    "drainage_quality" VARCHAR(50),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("container_id")
);

-- CreateTable
CREATE TABLE "PlantCatalog" (
    "plant_id" SERIAL NOT NULL,
    "common_name" VARCHAR(100) NOT NULL,
    "scientific_name" VARCHAR(100),
    "plant_type" VARCHAR(50),
    "life_cycle" VARCHAR(50),
    "growth_habit" VARCHAR(50),
    "edible" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "planting_instructions" TEXT,
    "care_instructions" TEXT,
    "days_to_germination_min" INTEGER,
    "days_to_germination_max" INTEGER,
    "days_to_maturity_min" INTEGER,
    "days_to_maturity_max" INTEGER,
    "harvest_season" VARCHAR(50),
    "height_inches_min" DECIMAL(10,2),
    "height_inches_max" DECIMAL(10,2),
    "width_inches_min" DECIMAL(10,2),
    "width_inches_max" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlantCatalog_pkey" PRIMARY KEY ("plant_id")
);

-- CreateTable
CREATE TABLE "PlantGrowingCondition" (
    "condition_id" SERIAL NOT NULL,
    "plant_id" INTEGER NOT NULL,
    "min_temperature_f" INTEGER,
    "max_temperature_f" INTEGER,
    "sunlight_needs" VARCHAR(50),
    "water_needs" VARCHAR(50),
    "soil_ph_min" DECIMAL(4,2),
    "soil_ph_max" DECIMAL(4,2),
    "soil_type_preference" VARCHAR(100),
    "fertilizer_needs" VARCHAR(100),
    "spacing_inches" DECIMAL(10,2),
    "container_suitable" BOOLEAN NOT NULL DEFAULT true,
    "min_container_depth_inches" DECIMAL(10,2),
    "min_container_volume_gallons" DECIMAL(10,2),

    CONSTRAINT "PlantGrowingCondition_pkey" PRIMARY KEY ("condition_id")
);

-- CreateTable
CREATE TABLE "PlantClimateZone" (
    "id" SERIAL NOT NULL,
    "plant_id" INTEGER NOT NULL,
    "climate_zone" VARCHAR(50) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "PlantClimateZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantVariety" (
    "variety_id" SERIAL NOT NULL,
    "plant_id" INTEGER NOT NULL,
    "variety_name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "specific_traits" TEXT,
    "specific_care_needs" TEXT,
    "image_url" VARCHAR(255),

    CONSTRAINT "PlantVariety_pkey" PRIMARY KEY ("variety_id")
);

-- CreateTable
CREATE TABLE "PlantCompanion" (
    "companion_id" SERIAL NOT NULL,
    "plant_id" INTEGER NOT NULL,
    "companion_plant_id" INTEGER NOT NULL,
    "relationship_type" VARCHAR(50) NOT NULL,
    "effect_description" TEXT,

    CONSTRAINT "PlantCompanion_pkey" PRIMARY KEY ("companion_id")
);

-- CreateTable
CREATE TABLE "ContainerPlant" (
    "container_plant_id" SERIAL NOT NULL,
    "container_id" INTEGER NOT NULL,
    "plant_id" INTEGER NOT NULL,
    "variety_id" INTEGER,
    "quantity" DECIMAL(10,2),
    "plant_date" DATE NOT NULL,
    "initial_stage" VARCHAR(50) NOT NULL,
    "current_stage" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "position_x" DECIMAL(10,2),
    "position_y" DECIMAL(10,2),
    "expected_harvest_date" DATE,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContainerPlant_pkey" PRIMARY KEY ("container_plant_id")
);

-- CreateTable
CREATE TABLE "PlantGrowthStage" (
    "stage_id" SERIAL NOT NULL,
    "container_plant_id" INTEGER NOT NULL,
    "stage_name" VARCHAR(50) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "notes" TEXT,
    "image_url" VARCHAR(255),

    CONSTRAINT "PlantGrowthStage_pkey" PRIMARY KEY ("stage_id")
);

-- CreateTable
CREATE TABLE "ActionType" (
    "action_type_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(50),

    CONSTRAINT "ActionType_pkey" PRIMARY KEY ("action_type_id")
);

-- CreateTable
CREATE TABLE "GardenAction" (
    "action_id" SERIAL NOT NULL,
    "action_type_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "garden_id" INTEGER,
    "container_id" INTEGER,
    "container_plant_id" INTEGER,
    "action_date" TIMESTAMP(3) NOT NULL,
    "quantity" DECIMAL(10,2),
    "unit" VARCHAR(50),
    "notes" TEXT,
    "success_rating" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GardenAction_pkey" PRIMARY KEY ("action_id")
);

-- CreateTable
CREATE TABLE "Harvest" (
    "harvest_id" SERIAL NOT NULL,
    "container_plant_id" INTEGER NOT NULL,
    "harvest_date" DATE NOT NULL,
    "quantity" DECIMAL(10,2),
    "unit" VARCHAR(50),
    "quality_rating" INTEGER,
    "notes" TEXT,
    "image_url" VARCHAR(255),

    CONSTRAINT "Harvest_pkey" PRIMARY KEY ("harvest_id")
);

-- CreateTable
CREATE TABLE "ContainerHistory" (
    "history_id" SERIAL NOT NULL,
    "container_id" INTEGER NOT NULL,
    "previous_container_id" INTEGER,
    "previous_garden_id" INTEGER,
    "new_garden_id" INTEGER,
    "move_date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,

    CONSTRAINT "ContainerHistory_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "PlantMovementHistory" (
    "movement_id" SERIAL NOT NULL,
    "container_plant_id" INTEGER NOT NULL,
    "previous_container_id" INTEGER,
    "new_container_id" INTEGER,
    "move_date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "plant_condition_before" VARCHAR(50),
    "plant_condition_after" VARCHAR(50),

    CONSTRAINT "PlantMovementHistory_pkey" PRIMARY KEY ("movement_id")
);

-- CreateTable
CREATE TABLE "SeasonalPlan" (
    "plan_id" SERIAL NOT NULL,
    "garden_id" INTEGER NOT NULL,
    "season" VARCHAR(50) NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeasonalPlan_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "PlannedPlanting" (
    "planned_planting_id" SERIAL NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "container_id" INTEGER NOT NULL,
    "plant_id" INTEGER NOT NULL,
    "variety_id" INTEGER,
    "planned_date" DATE,
    "quantity" DECIMAL(10,2),
    "notes" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'planned',

    CONSTRAINT "PlannedPlanting_pkey" PRIMARY KEY ("planned_planting_id")
);

-- CreateIndex
CREATE INDEX "Garden_user_id_idx" ON "Garden"("user_id");

-- CreateIndex
CREATE INDEX "GardenCondition_garden_id_idx" ON "GardenCondition"("garden_id");

-- CreateIndex
CREATE INDEX "Container_garden_id_idx" ON "Container"("garden_id");

-- CreateIndex
CREATE INDEX "Container_container_type_id_idx" ON "Container"("container_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "PlantGrowingCondition_plant_id_key" ON "PlantGrowingCondition"("plant_id");

-- CreateIndex
CREATE INDEX "PlantClimateZone_plant_id_idx" ON "PlantClimateZone"("plant_id");

-- CreateIndex
CREATE INDEX "PlantVariety_plant_id_idx" ON "PlantVariety"("plant_id");

-- CreateIndex
CREATE INDEX "PlantCompanion_plant_id_idx" ON "PlantCompanion"("plant_id");

-- CreateIndex
CREATE INDEX "PlantCompanion_companion_plant_id_idx" ON "PlantCompanion"("companion_plant_id");

-- CreateIndex
CREATE INDEX "ContainerPlant_container_id_idx" ON "ContainerPlant"("container_id");

-- CreateIndex
CREATE INDEX "ContainerPlant_plant_id_idx" ON "ContainerPlant"("plant_id");

-- CreateIndex
CREATE INDEX "ContainerPlant_variety_id_idx" ON "ContainerPlant"("variety_id");

-- CreateIndex
CREATE INDEX "PlantGrowthStage_container_plant_id_idx" ON "PlantGrowthStage"("container_plant_id");

-- CreateIndex
CREATE INDEX "GardenAction_action_type_id_idx" ON "GardenAction"("action_type_id");

-- CreateIndex
CREATE INDEX "GardenAction_user_id_idx" ON "GardenAction"("user_id");

-- CreateIndex
CREATE INDEX "GardenAction_garden_id_idx" ON "GardenAction"("garden_id");

-- CreateIndex
CREATE INDEX "GardenAction_container_id_idx" ON "GardenAction"("container_id");

-- CreateIndex
CREATE INDEX "GardenAction_container_plant_id_idx" ON "GardenAction"("container_plant_id");

-- CreateIndex
CREATE INDEX "Harvest_container_plant_id_idx" ON "Harvest"("container_plant_id");

-- CreateIndex
CREATE INDEX "ContainerHistory_container_id_idx" ON "ContainerHistory"("container_id");

-- CreateIndex
CREATE INDEX "ContainerHistory_previous_garden_id_idx" ON "ContainerHistory"("previous_garden_id");

-- CreateIndex
CREATE INDEX "ContainerHistory_new_garden_id_idx" ON "ContainerHistory"("new_garden_id");

-- CreateIndex
CREATE INDEX "PlantMovementHistory_container_plant_id_idx" ON "PlantMovementHistory"("container_plant_id");

-- CreateIndex
CREATE INDEX "SeasonalPlan_garden_id_idx" ON "SeasonalPlan"("garden_id");

-- CreateIndex
CREATE INDEX "PlannedPlanting_plan_id_idx" ON "PlannedPlanting"("plan_id");

-- CreateIndex
CREATE INDEX "PlannedPlanting_container_id_idx" ON "PlannedPlanting"("container_id");

-- CreateIndex
CREATE INDEX "PlannedPlanting_plant_id_idx" ON "PlannedPlanting"("plant_id");

-- CreateIndex
CREATE INDEX "PlannedPlanting_variety_id_idx" ON "PlannedPlanting"("variety_id");

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenCondition" ADD CONSTRAINT "GardenCondition_garden_id_fkey" FOREIGN KEY ("garden_id") REFERENCES "Garden"("garden_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_garden_id_fkey" FOREIGN KEY ("garden_id") REFERENCES "Garden"("garden_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_container_type_id_fkey" FOREIGN KEY ("container_type_id") REFERENCES "ContainerType"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantGrowingCondition" ADD CONSTRAINT "PlantGrowingCondition_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "PlantCatalog"("plant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantClimateZone" ADD CONSTRAINT "PlantClimateZone_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "PlantCatalog"("plant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantVariety" ADD CONSTRAINT "PlantVariety_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "PlantCatalog"("plant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantCompanion" ADD CONSTRAINT "PlantCompanion_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "PlantCatalog"("plant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantCompanion" ADD CONSTRAINT "PlantCompanion_companion_plant_id_fkey" FOREIGN KEY ("companion_plant_id") REFERENCES "PlantCatalog"("plant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerPlant" ADD CONSTRAINT "ContainerPlant_container_id_fkey" FOREIGN KEY ("container_id") REFERENCES "Container"("container_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerPlant" ADD CONSTRAINT "ContainerPlant_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "PlantCatalog"("plant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerPlant" ADD CONSTRAINT "ContainerPlant_variety_id_fkey" FOREIGN KEY ("variety_id") REFERENCES "PlantVariety"("variety_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantGrowthStage" ADD CONSTRAINT "PlantGrowthStage_container_plant_id_fkey" FOREIGN KEY ("container_plant_id") REFERENCES "ContainerPlant"("container_plant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenAction" ADD CONSTRAINT "GardenAction_action_type_id_fkey" FOREIGN KEY ("action_type_id") REFERENCES "ActionType"("action_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenAction" ADD CONSTRAINT "GardenAction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenAction" ADD CONSTRAINT "GardenAction_garden_id_fkey" FOREIGN KEY ("garden_id") REFERENCES "Garden"("garden_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenAction" ADD CONSTRAINT "GardenAction_container_id_fkey" FOREIGN KEY ("container_id") REFERENCES "Container"("container_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenAction" ADD CONSTRAINT "GardenAction_container_plant_id_fkey" FOREIGN KEY ("container_plant_id") REFERENCES "ContainerPlant"("container_plant_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvest" ADD CONSTRAINT "Harvest_container_plant_id_fkey" FOREIGN KEY ("container_plant_id") REFERENCES "ContainerPlant"("container_plant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerHistory" ADD CONSTRAINT "ContainerHistory_container_id_fkey" FOREIGN KEY ("container_id") REFERENCES "Container"("container_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerHistory" ADD CONSTRAINT "ContainerHistory_previous_container_id_fkey" FOREIGN KEY ("previous_container_id") REFERENCES "Container"("container_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerHistory" ADD CONSTRAINT "ContainerHistory_previous_garden_id_fkey" FOREIGN KEY ("previous_garden_id") REFERENCES "Garden"("garden_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerHistory" ADD CONSTRAINT "ContainerHistory_new_garden_id_fkey" FOREIGN KEY ("new_garden_id") REFERENCES "Garden"("garden_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantMovementHistory" ADD CONSTRAINT "PlantMovementHistory_container_plant_id_fkey" FOREIGN KEY ("container_plant_id") REFERENCES "ContainerPlant"("container_plant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonalPlan" ADD CONSTRAINT "SeasonalPlan_garden_id_fkey" FOREIGN KEY ("garden_id") REFERENCES "Garden"("garden_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedPlanting" ADD CONSTRAINT "PlannedPlanting_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "SeasonalPlan"("plan_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedPlanting" ADD CONSTRAINT "PlannedPlanting_container_id_fkey" FOREIGN KEY ("container_id") REFERENCES "Container"("container_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedPlanting" ADD CONSTRAINT "PlannedPlanting_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "PlantCatalog"("plant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedPlanting" ADD CONSTRAINT "PlannedPlanting_variety_id_fkey" FOREIGN KEY ("variety_id") REFERENCES "PlantVariety"("variety_id") ON DELETE SET NULL ON UPDATE CASCADE;
