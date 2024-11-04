const express = require('express');
const app = express();
const port = 3000;
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware
app.engine('handlebars', require('express-handlebars').engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async (req, res) => {
    res.render('home', {fungi: await prisma.fungus.findMany()});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});