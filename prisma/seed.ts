

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const specializations = [
        { name: "Civil and Industrial Construction" },
        { name: "Infrastructure and Public Works" },
        { name: "Building Installations" },
        { name: "Construction Materials" },
        { name: "Architecture, Design, and Consulting" },
        { name: "Demolition and Excavation" },
        { name: "Rehabilitation and Renovation" },
        { name: "Green and Sustainable Construction" },
        { name: "Maintenance and Repairs" },
        { name: "Project Management" },
        { name: "Health and Safety" },
        { name: "Quality Control" },
        { name: "Surveying and Geomatics" },
        { name: "Electrical Installations" },
        { name: "Mechanical Installations" },
        { name: "Plumbing and Sanitary Installations" },
        { name: "HVAC Systems" },
        { name: "Fire Protection Systems" },
        { name: "Interior Design" },
        { name: "Landscaping" },
        { name: "Urban Planning" },
        { name: "Environmental Engineering" },
        { name: "Structural Engineering" },
        { name: "Geotechnical Engineering" },
        { name: "Transportation Engineering" },
        { name: "Water Resources Engineering" },
        { name: "Construction Management" },
        { name: "Facility Management" }
    ];

    for (const specialization of specializations) {
        await prisma.specialization.upsert({
            where: { name: specialization.name },
            update: {},
            create: specialization,
        });
    }

    console.log("Specializations seeded successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
