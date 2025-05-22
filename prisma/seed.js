const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed data for tree_genus
    const treeGenera = [
        { genus_name: 'Quercus (Oak)' },
        { genus_name: 'Pinus (Pine)' },
        { genus_name: 'Acer (Maple)' },
        { genus_name: 'Betula (Birch)' },
        { genus_name: 'Ulmus (Elm)' },
        { genus_name: 'Populus (Aspen/Poplar)' },
        { genus_name: 'Abies (Fir)' },
        { genus_name: 'Picea (Spruce)' },
        { genus_name: 'Fagus (Beech)' },
        { genus_name: 'Tsuga (Hemlock)' },
        { genus_name: 'Larix (Larch)' },
        { genus_name: 'Fraxinus (Ash)' },
        { genus_name: 'Thuja (Cedar)' },
        { genus_name: 'Tilia (Linden)' },
        { genus_name: 'Prunus (Cherry)' }
    ];

    // Seed tree genera
    for (const genus of treeGenera) {
        await prisma.tree_genus.upsert({
            where: { genus_name: genus.genus_name },
            update: {},
            create: genus,
        });
    }

    console.log('Tree genera seeded successfully.');

    // Seed data for Fungus
    const fungi = [
        {
            latin_name: `Laetiporus sulphureus`,
            name: `Chicken of the Woods`,
            type_of_decay: `trunk_rot_and_branch_rot`,
            life_span: `annual`,
            shape: `leathery_crust`,
            description: `Chicken of the Woods is a bright orange shelf fungus that grows on trees. It is a saprotrophic fungus, meaning it feeds on dead or decaying organic matter. Chicken of the Woods is a choice edible mushroom that is prized for its meaty texture and mild flavor. It is commonly used in vegetarian dishes as a meat substitute. Chicken of the Woods is also known for its bright orange color, which makes it easy to spot in the forest.`,
            associatedGenera: ['Quercus (Oak)', 'Fagus (Beech)']
        },
        {
            latin_name: `Ganoderma lucidum`,
            name: `Reishi`,
            type_of_decay: `trunk_rot_and_branch_rot`,
            life_span: `perennial`,
            shape: `leathery_crust`,
            description: `Reishi is a type of shelf fungus that grows on trees. It is a saprotrophic fungus, meaning it feeds on dead or decaying organic matter. Reishi is a medicinal mushroom that has been used for centuries in traditional Chinese medicine. It is believed to have a variety of health benefits, including boosting the immune system, reducing inflammation, and improving overall health. Reishi is also known for its bitter taste and woody texture.`,
            associatedGenera: ['Acer (Maple)', 'Fraxinus (Ash)']
        },
        {
            latin_name: `Pleurotus ostreatus`,
            name: `Oyster Mushroom`,
            type_of_decay: `trunk_rot_and_branch_rot`,
            life_span: `perennial`,
            shape: `leathery_crust`,
            description: `Oyster mushrooms are a type of shelf fungus that grow on trees. They are saprotrophic fungi, meaning they feed on dead or decaying organic matter. Oyster mushrooms are a popular edible mushroom that is prized for its delicate flavor and meaty texture. They are commonly used in a variety of dishes, including stir-fries, soups, and pasta dishes. Oyster mushrooms are also known for their distinctive oyster-like shape and color.`,
            associatedGenera: ['Populus (Aspen/Poplar)', 'Fagus (Beech)', 'Betula (Birch)']
        },
    ];

    // Check if fungi already exist and delete old ones
    const existingFungi = await prisma.fungus.findMany();
    if (existingFungi.length > 0) {
        console.log('Clearing existing fungi data...');
        // Delete all fungus_tree_genus relations first
        await prisma.fungus_tree_genus.deleteMany();
        // Then delete all fungi
        await prisma.fungus.deleteMany();
    }

    // Insert data into Fungus table and create associations with tree genera
    for (const fungus of fungi) {
        // Extract associatedGenera before creating fungus
        const { associatedGenera, ...fungusData } = fungus;

        // Create fungus using create instead of upsert
        const createdFungus = await prisma.fungus.create({
            data: fungusData,
        });

        console.log(`Created fungus: ${createdFungus.name}`);

        // If fungus has associated tree genera
        if (associatedGenera && associatedGenera.length > 0) {
            // For each tree genus, create association with fungus
            for (const genusName of associatedGenera) {
                // Find tree genus by name
                const treeGenus = await prisma.tree_genus.findUnique({
                    where: { genus_name: genusName }
                });

                if (treeGenus) {
                    // Create association between fungus and tree genus
                    await prisma.fungus_tree_genus.create({
                        data: {
                            fungus_id: createdFungus.id,
                            tree_genus_id: treeGenus.id
                        }
                    });
                    console.log(`Associated ${createdFungus.name} with ${genusName}`);
                } else {
                    console.warn(`Tree genus not found: ${genusName}`);
                }
            }
        }
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