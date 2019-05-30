const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/43b73e35134a607bae500087d3dbb3d0/'+encodeURIComponent(long)+','+encodeURIComponent(lat)+'?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            const current_weather = body.currently
            const temp = current_weather.temperature
            const precip_prob = current_weather.precipProbability
            const print_string = body.daily.data[0].summary +' It is currently '+temp+' degrees out. There is a '+precip_prob+'% chance of rain.'
            callback(undefined, print_string)
        }
    })
}

module.exports = forecast