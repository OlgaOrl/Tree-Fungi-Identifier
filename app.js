const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Настройка Handlebars с хелпером eq для сравнения значений
app.engine('handlebars', engine({
    helpers: {
        eq: (a, b) => a === b,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());

// Обработка GET запроса с фильтрами и сортировкой
app.get('/', async (req, res) => {
    console.log('Received query:', req.query);

    // Деструктуризация с учетом корректного имени поля: life_span
    const { type_of_decay, life_span, shape, sort } = req.query;
    const filter = {};

    // Формируем фильтр – если значение не равно "All", применяем его
    if (type_of_decay && type_of_decay !== 'All') {
        filter.type_of_decay = type_of_decay;
    }
    if (life_span && life_span !== 'All') {
        // Здесь используем имя поля life_span, как в модели Prisma
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
                // Используем life_span для сортировки
                orderBy.push({ life_span: 'asc' });
                break;
            case 'lifespan_desc':
                orderBy.push({ life_span: 'desc' });
                break;
            default:
                break;
        }
    }

    // Получаем данные из БД с применением фильтра и сортировки
    const fungi = await prisma.fungus.findMany({
        where: filter,
        orderBy: orderBy.length > 0 ? orderBy : undefined,
    });

    // Передаём fungi и исходные query-параметры для сохранения состояния фильтра в форме
    res.render('home', { fungi, query: req.query });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
