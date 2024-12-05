const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', async (req, res) => {
    const { type_of_decay, life_span, shape, sort } = req.query; // Add sort from req.query

    // Build a filter object based on query parameters
    const filter = {};
    if (type_of_decay) {
        filter.type_of_decay = type_of_decay; // Fixed to match Prisma model
    }
    if (life_span) {
        filter.lifespan = life_span;
    }
    if (shape) {
        filter.shape = shape;
    }

    // Add sorting logic here
    let orderBy = []; // Initialize variable
    if (sort) {
        switch (sort) {
            case 'name_asc':
                orderBy.push({ name: 'asc' });
                break;
            case 'name_desc':
                orderBy.push({ name: 'desc' });
                break;
            case 'lifespan_asc':
                orderBy.push({ lifespan: 'asc' });
                break;
            case 'lifespan_desc':
                orderBy.push({ lifespan: 'desc' });
                break;
            default:
                break;
        }
    }

    // Retrieve filtered fungi from the database
    const fungi = await prisma.fungus.findMany({
        where: filter,
        orderBy: orderBy.length > 0 ? orderBy : undefined, // Check if sorting is present
    });

    res.render('home', { fungi });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});