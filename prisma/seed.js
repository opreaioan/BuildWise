// Usage: npx prisma db seed --preview-feature
// Description: Seed the database with initial data
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");
    await prisma.role.createMany({
        data: [
            { idRole: 1, role_name: "Admin" },
            { idRole: 2, role_name: "Company" },
            { idRole: 3, role_name: "Client" },
        ],
    });
    console.log("Database seeded!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
