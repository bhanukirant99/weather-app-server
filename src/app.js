const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bhanu Kiran'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bhanu Kiran'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bhanu Kiran'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        place_name: "Whoopie, вул. Пушкінська, 31, Одеса, Odessa, Ukraine",
        center: [
        30.742241,
        46.477855
        ],
        geometry: {
            coordinates: [
                30.742241,
                46.477855
            ]
        }
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'Help article not found',
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        error: 'Page not found',
    });
});

app.listen(3000, () => {
    console.log('Server is up and running at port 3000');
});