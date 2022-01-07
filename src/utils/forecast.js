const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7ecaaad801e3b3edd00edfd7cb131778&query=" +
    latitude +
    "," +
    longitude;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        weather_desc: body.current.weather_descriptions[0],
        tempt: body.current.temperature,
        precip: body.current.precip,
        humid: body.current.humidity,
        feell: body.current.feelslike,
        weatherIcon: body.current.weather_icons[0],
        dateTime: body.location.localtime,
      });
    }
  });
};

module.exports = forecast;
