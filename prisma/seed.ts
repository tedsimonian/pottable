import { PrismaClient } from "@prisma/client";

import type { Prisma } from "~/generated/prisma-client";

import plantsCatalog from "./data/plants.json";

const prisma = new PrismaClient();

type PlantSeedData = Array<
  Prisma.PlantCatalogCreateInput & {
    growingConditions: Prisma.PlantGrowingConditionCreateInput;
    climateZones: Prisma.PlantClimateZoneCreateInput[];
  }
>;

async function main() {
  try {
    // Read the plants data
    const plantsData = plantsCatalog as PlantSeedData;

    console.log("🌱 Starting to seed plants...");

    // Loop through each plant and create it with its relationships
    for (const plant of plantsData) {
      const { growingConditions, climateZones, ...plantData } = plant;

      // Create the plant
      const createdPlant = await prisma.plantCatalog.create({
        data: {
          ...plantData,
          createdAt: new Date(),
          updatedAt: new Date(),
          // Create growing conditions
          growingConditions: {
            create: {
              ...growingConditions,
            },
          },
          // Create climate zones
          climateZones: {
            create: climateZones,
          },
        },
      });

      console.log(`✅ Created plant: ${createdPlant.commonName}`);
    }

    console.log("✅ Plants seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
