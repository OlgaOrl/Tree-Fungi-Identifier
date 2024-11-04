const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed data for Fungus
    const fungi = [
        {
            name: 'Agaricus bisporus',
            description: 'Commonly known as the button mushroom.',
        },
        {
            name: 'Pleurotus ostreatus',
            description: 'Also known as the oyster mushroom.',
        },
        {
            name: 'Lentinula edodes',
            description: 'Known as the shiitake mushroom, popular in Asian cuisine.',
        },
        {
            name: 'Ganoderma lucidum',
            description: 'Known as the reishi mushroom, used in traditional medicine.',
        },
    ];

    // Insert data into Fungus table
    for (const fungus of fungi) {
        await prisma.fungus.create({
            data: fungus,
        });
    }

    console.log('Database seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
