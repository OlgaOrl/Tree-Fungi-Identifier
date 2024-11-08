//Script for seeding the database with some fungi
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*
-- auto-generated definition
create table Fungus
(
    id          INTEGER                            not null
        primary key autoincrement,
    name        TEXT                               not null,
    description TEXT                               not null,
    image       TEXT                               not null,
    createdAt   DATETIME default CURRENT_TIMESTAMP not null,
    updatedAt   DATETIME                           not null
);
 */
async function main() {
    const fungi = [
        {
            name: 'Agaricus bisporus',
            description: 'A common edible mushroom.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Agaricus_bisporus_02.jpg/1920px-Agaricus_bisporus_02.jpg',
        },
        {
            name: 'Amanita phalloides',
            description: 'A deadly poisonous mushroom.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Amanita_phalloides_6514.jpg/1920px-Amanita_phalloides_6514.jpg',
        },
        {
            name: 'Lactarius indigo',
            description: 'An edible blue mushroom.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lactarius_indigo_48568.jpg/1920px-Lactarius_indigo_48568.jpg',
    for (const fungus of fungi) {
        await prisma.fungus.create({
            data: fungus,
        });
    }
}

main().then(() => {
    console.log('Fungi seeded!');
})