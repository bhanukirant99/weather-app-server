const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
    const address = req.query.address;
    if(!address) {
        return res.send ({
            error: 'Please provide a address to view the weather report'
        });
    }   else {
            geocode(address, (error, {latitude, longitude, location} = {}) => {
                if (error) {
                    return res.send({
                        error: 'Unable to locate the Place, try another location'
                    });
                }
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send(error);
                    }
                    res.send({
                        address: req.query.address,
                        location,
                        forecast: forecastData
                    });
                });
            });
            console.log(req.query)
            // res.send({
            //     place_name: "Whoopie, вул. Пушкінська, 31, Одеса, Odessa, Ukraine",
            //     forecast: "Its' raining"
            // });
        }
});

app.get('/test', (req, res) => {
    if(!req.place) {
        return res.send ({
            error: 'Please provide a location to view the weather report'
        });
    }
    console.log(req.query);
    res.send({
        test: 'working'
    })
})

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