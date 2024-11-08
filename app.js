const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.engine('handlebars', require('express-handlebars').engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', {fungi: [
        {name: 'Agaricus bisporus', type: 'edible'},
        {name: 'Amanita phalloides', type: 'deadly'},
        {name: 'Lactarius indigo', type: 'edible'},
        ]
    });

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});