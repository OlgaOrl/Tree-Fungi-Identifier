const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed data for tree_genus
    const treeGenus = [
        { genus_name: 'Abies sp' },
        { genus_name: 'Acer sp' },
        { genus_name: 'Alnus sp' },
        { genus_name: 'Betula sp' },
        { genus_name: 'Fagus' },
        { genus_name: 'Fraxinus' },
        { genus_name: 'Juniperus sp' },
        { genus_name: 'Larix sp' },
        { genus_name: 'Picea sp' },
        { genus_name: 'Pinus sp' },
        { genus_name: 'Populus sp' },
        { genus_name: 'Prunus sp' },
        { genus_name: 'Quercus sp' },
        { genus_name: 'Robinia sp' },
        { genus_name: 'Salix alba' },
        { genus_name: 'Salix sp' },
        { genus_name: 'Ulmus glabra' },
        { genus_name: 'Ulmus laevis' }
    ];

    // Seed tree genera (safe - uses upsert)
    for (const genus of treeGenus) {
        await prisma.tree_genus.upsert({
            where: { genus_name: genus.genus_name },
            update: {},
            create: { genus_name: genus.genus_name }
        });
    }

    console.log('Tree genus seeded successfully.');

    // SAFE: Only add fungi if they don't exist (no deletion!)
    const fungiToAdd = [
        {
            latin_name: 'Laetiporus sulphureus',
            name: 'Chicken of the Woods',
            type_of_decay: 'trunk_rot_and_branch_rot',
            life_span: 'annual',
            shape: 'leathery_crust',
            description: 'Chicken of the Woods is a bright orange shelf fungus that grows on trees. It is a saprotrophic fungus, meaning it feeds on dead or decaying organic matter. Chicken of the Woods is a choice edible mushroom that is prized for its meaty texture and mild flavor. It is commonly used in vegetarian dishes as a meat substitute. Chicken of the Woods is also known for its bright orange color, which makes it easy to spot in the forest.',
            image: '/api/placeholder/400/300',
            associatedGenera: ['Quercus sp', 'Fagus']
        },
        {
            latin_name: 'Ganoderma lucidum',
            name: 'Reishi',
            type_of_decay: 'trunk_rot_and_branch_rot',
            life_span: 'perennial',
            shape: 'leathery_crust',
            description: 'Reishi is a type of shelf fungus that grows on trees. It is a saprotrophic fungus, meaning it feeds on dead or decaying organic matter. Reishi is a medicinal mushroom that has been used for centuries in traditional Chinese medicine. It is believed to have a variety of health benefits, including boosting the immune system, reducing inflammation, and improving overall health. Reishi is also known for its bitter taste and woody texture.',
            image: '/api/placeholder/400/300',
            associatedGenera: ['Acer sp', 'Fraxinus']
        },
        {
            latin_name: 'Pleurotus ostreatus',
            name: 'Oyster Mushroom',
            type_of_decay: 'trunk_rot_and_branch_rot',
            life_span: 'perennial',
            shape: 'leathery_crust',
            description: 'Oyster mushrooms are a type of shelf fungus that grow on trees. They are saprotrophic fungi, meaning they feed on dead or decaying organic matter. Oyster mushrooms are a popular edible mushroom that is prized for its delicate flavor and meaty texture. They are commonly used in a variety of dishes, including stir-fries, soups, and pasta dishes. Oyster mushrooms are also known for their distinctive oyster-like shape and color.',
            image: '/api/placeholder/400/300',
            associatedGenera: ['Populus sp', 'Fagus', 'Betula sp']
        },
        {
            latin_name: 'Heterobasidion annosum',
            name: 'Annosum Root Rot',
            type_of_decay: 'root_rot_and_butt_rot',
            life_span: 'perennial',
            shape: 'leathery_crust',
            description: 'Annosum Root Rot is a type of shelf fungus that grows on trees. It is a saprotrophic fungus, meaning it feeds on dead or decaying organic matter. Annosum Root Rot is a pathogenic fungus that causes root rot in coniferous trees. It is commonly found in forests and can cause significant damage to tree populations. Annosum Root Rot is also known for its leathery crust-like appearance and can be difficult to spot until it has caused significant damage.',
            image: '/api/placeholder/400/300',
            associatedGenera: ['Pinus sp', 'Abies sp']
        },
        {
            latin_name: 'Inonotus obliquus',
            name: 'Chaga',
            type_of_decay: 'trunk_rot_and_branch_rot',
            life_span: 'perennial',
            shape: 'hoof_shaped',
            description: 'Chaga is a type of shelf fungus that grows on trees. It is a saprotrophic fungus, meaning it feeds on dead or decaying organic matter. Chaga is a medicinal mushroom that has been used for centuries in traditional medicine. It is believed to have a variety of health benefits, including boosting the immune system, reducing inflammation, and improving overall health. Chaga is also known for its distinctive black color and irregular shape.',
            image: '/api/placeholder/400/300',
            associatedGenera: ['Betula sp']
        }
    ];

    // SAFE approach: Check each fungus individually
    for (const fungusItem of fungiToAdd) {
        const { associatedGenera, ...fungusData } = fungusItem;

        // Check if fungus already exists
        const existingFungus = await prisma.fungus.findFirst({
            where: { latin_name: fungusData.latin_name }
        });

        if (existingFungus) {
            console.log(`Fungus ${fungusData.name} already exists, skipping...`);
            continue;
        }

        // Create fungus only if it doesn't exist
        const createdFungus = await prisma.fungus.create({
            data: {
                latin_name: fungusData.latin_name,
                name: fungusData.name,
                type_of_decay: fungusData.type_of_decay,
                life_span: fungusData.life_span,
                shape: fungusData.shape,
                description: fungusData.description,
                image: fungusData.image
            }
        });

       if (createdFungus && createdFungus.name) {
           console.log(`Created fungus: ${createdFungus.name}`);
       } else {
           console.error('Failed to create fungus or fungus name is undefined.');
       }

        // Add associations with tree genera
        if (associatedGenera && associatedGenera.length > 0) {
            for (const genusName of associatedGenera) {
                const foundTreeGenus = await prisma.tree_genus.findUnique({
                    where: { genus_name: genusName }
                });

                if (foundTreeGenus) {
                    // Check if association already exists
                    const existingAssociation = await prisma.fungus_tree_genus.findFirst({
                        where: {
                            fungus_id: createdFungus.id,
                            tree_genus_id: foundTreeGenus.id
                        }
                    });

                    if (!existingAssociation) {
                        await prisma.fungus_tree_genus.create({
                            data: {
                                fungus_id: createdFungus.id,
                                tree_genus_id: foundTreeGenus.id
                            }
                        });
                        console.log(`Associated ${createdFungus.name} with ${genusName}`);
                    }
                } else {
                    console.warn(`Tree genus not found: ${genusName}`);
                }
            }
        }
    }

    // Show current count
    const totalFungi = await prisma.fungus.count();
    console.log(`Database now contains ${totalFungi} fungi total.`);
    console.log('Seed completed safely - no existing data was deleted!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });