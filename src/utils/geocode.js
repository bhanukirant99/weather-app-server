const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmhhbnVraXJhbnQiLCJhIjoiY2tkbmN2NHp6MWdpMDJ6cm9jcGNqeXFoZSJ9.yqTu319Fm2KmCH0KQnj5NQ&limit=1';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to get response from location api', undefined);
            console.log('Unable to get response from location api');
        } else if (body.message || body.features.length === 0) {
            callback('Unable to locate the Place, try another', undefined);
            console.log('Unable to locate the Place, try another');
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }  
    });
};

module.exports = geocode;