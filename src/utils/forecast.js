const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?key=5a2cdd958d8a4184aef499a76ec9a3bb&lat=' + lat + '&lon=' + long;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to get response from weather api', undefined);
        } else if (body.error) {
            callback('Place not found', undefined);
        } else {
            callback(undefined, "It is currently " + body.data[0].temp + " degrees out. There is a " + body.data[0].precip + "% chance of rain.");
        }
    });
}

module.exports = forecast;