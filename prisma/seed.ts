import { PrismaClient } from "@prisma/client";
import { ROLES } from "~/permissions";

const prisma = new PrismaClient();

const admins = [
  {
    email: "tedsimonian@gmail.com",
    name: "Ted Simonian",
  },
];

async function main() {
  // Create admin user
  for (const admin of admins) {
    await prisma.user.upsert({
      where: { email: admin.email },
      update: {
        role: ROLES.ADMIN,
      },
      create: {
        id: "github_admin", // This will be overwritten by Better-Auth when you actually sign in
        name: admin.name,
        email: admin.email,
        emailVerified: true,
        role: ROLES.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  console.log("✅ Database has been seeded");
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
