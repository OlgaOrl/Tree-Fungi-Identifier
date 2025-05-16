const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Настройка Handlebars с хелперами
app.engine('handlebars', engine({
    helpers: {
        eq: (a, b) => a === b,
        toString: (value) => value.toString(), // Добавляем хелпер для преобразования в строку
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());

// Обработка GET запроса с фильтрами и сортировкой
app.get('/', async (req, res) => {
    console.log('Received query:', req.query);

    // Деструктуризация с учетом корректного имени поля
    const { type_of_decay, life_span, shape, sort, tree_genus_id } = req.query;
    const filter = {};

    // Формируем фильтр
    if (type_of_decay && type_of_decay !== 'All') {
        filter.type_of_decay = type_of_decay;
    }
    if (life_span && life_span !== 'All') {
        filter.life_span = life_span;
    }
    if (shape && shape !== 'All') {
        filter.shape = shape;
    }

    console.log('Applied filter:', filter);

    // Формируем сортировку
    let orderBy = [];
    if (sort) {
        switch (sort) {
            case 'name_asc':
                orderBy.push({ name: 'asc' });
                break;
            case 'name_desc':
                orderBy.push({ name: 'desc' });
                break;
            case 'lifespan_asc':
                orderBy.push({ life_span: 'asc' });
                break;
            case 'lifespan_desc':
                orderBy.push({ life_span: 'desc' });
                break;
            default:
                break;
        }
    }

    // Получаем все роды деревьев для выпадающего списка
    const treeGenera = await prisma.tree_genus.findMany({
        orderBy: { genus_name: 'asc' }
    });

    let fungi;

    // Если выбран род дерева, используем связь многие-ко-многим для фильтрации
    if (tree_genus_id) {
        // Преобразуем tree_genus_id в число
        const genusId = parseInt(tree_genus_id);

        // Находим грибы, связанные с выбранным родом дерева
        fungi = await prisma.fungus.findMany({
            where: {
                ...filter,
                // Используем связь через таблицу fungus_tree_genus
                AND: [
                    {
                        id: {
                            in: await prisma.fungus_tree_genus.findMany({
                                where: { tree_genus_id: genusId },
                                select: { fungus_id: true }
                            }).then(results => results.map(r => r.fungus_id))
                        }
                    }
                ]
            },
            orderBy: orderBy.length > 0 ? orderBy : undefined,
        });

        // Добавляем информацию о родах деревьев к каждому грибу
        for (const fungus of fungi) {
            const treeGenusIds = await prisma.fungus_tree_genus.findMany({
                where: { fungus_id: fungus.id },
                select: { tree_genus_id: true }
            });

            fungus.treeGenera = await prisma.tree_genus.findMany({
                where: {
                    id: {
                        in: treeGenusIds.map(tg => tg.tree_genus_id)
                    }
                }
            });
        }
    } else {
        // Если род дерева не выбран, получаем все грибы с применением других фильтров
        fungi = await prisma.fungus.findMany({
            where: filter,
            orderBy: orderBy.length > 0 ? orderBy : undefined,
        });

        // Добавляем информацию о родах деревьев к каждому грибу
        for (const fungus of fungi) {
            const treeGenusIds = await prisma.fungus_tree_genus.findMany({
                where: { fungus_id: fungus.id },
                select: { tree_genus_id: true }
            });

            fungus.treeGenera = await prisma.tree_genus.findMany({
                where: {
                    id: {
                        in: treeGenusIds.map(tg => tg.tree_genus_id)
                    }
                }
            });
        }
    }

    // Передаём fungi, роды деревьев и исходные query-параметры для сохранения состояния фильтра в форме
    res.render('home', { fungi, treeGenera, query: req.query });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});