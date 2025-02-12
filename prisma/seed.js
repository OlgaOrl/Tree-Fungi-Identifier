const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed data for Fungus
    const fungi = [
        {
            latin_name: `Laetiporus sulphureus`,
            name: `Chicken of the Woods`,
            type_of_decay: `trunk_rot_and_branch_rot`,
            life_span: `annual`,
            shape: `leathery_crust`,
            description: `Chicken of the Woods is a bright orange shelf fungus that grows on trees. It is a saprotrophic fungus, meaning it feeds on dead or decaying organic matter. Chicken of the Woods is a choice edible mushroom that is prized for its meaty texture and mild flavor. It is commonly used in vegetarian dishes as a meat substitute. Chicken of the Woods is also known for its bright orange color, which makes it easy to spot in the forest.`
        },
        {
            latin_name: `Ganoderma lucidum`,
            name: `Reishi`,
            type_of_decay: `trunk_rot_and_branch_rot`,
            life_span: `perennial`,
            shape: `leathery_crust`,
            description: `Reishi is a type of shelf fungus that grows on trees. It is a saprotrophic fungus, meaning it feeds on dead or decaying organic matter. Reishi is a medicinal mushroom that has been used for centuries in traditional Chinese medicine. It is believed to have a variety of health benefits, including boosting the immune system, reducing inflammation, and improving overall health. Reishi is also known for its bitter taste and woody texture.`

        },
        {
            latin_name: `Pleurotus ostreatus`,
            name: `Oyster Mushroom`,
            type_of_decay: `trunk_rot_and_branch_rot`,
            life_span: `perennial`,
            shape: `leathery_crust`,
            description: `Oyster mushrooms are a type of shelf fungus that grow on trees. They are saprotrophic fungi, meaning they feed on dead or decaying organic matter. Oyster mushrooms are a popular edible mushroom that is prized for its delicate flavor and meaty texture. They are commonly used in a variety of dishes, including stir-fries, soups, and pasta dishes. Oyster mushrooms are also known for their distinctive oyster-like shape and color.`
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
