const path = require('path');
const exprexx = require('express');

const app = exprexx();
const publicDir = path.join(__dirname, '../public');

app.use(exprexx.static(publicDir));

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Raj',
//         age: 12
//     },{
//         name: 'Sam',
//         age: 13
//     }]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// });

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


app.listen(3000, () => {
    console.log('Server is up and running at port 3000');
});