const https = require('https');

const APP_KEY = process.env.APP_WEATHER_KEY;
const fetchWeather = (lat, lon) =>
  new Promise((resolve, reject) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${APP_KEY}`;

    https.get(url, (res) => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (data) => {
        body += data;
      });
      res.on('end', () => {
        body = JSON.parse(body);
        if (body.weather) {
          const weather = [];
          body.weather.forEach((data) => {
            weather.push({
              id: data.id,
              main: data.main,
              description: data.description,
              icon: `https://openweathermap.org/img/w/${data.icon}.png`,
            });
          });
          return resolve({ temperature: body.main.temp, weather });
        }
        return reject(new Error('Error fetch weather'));
      });
      res.on('error', () => {
        reject(new Error('Error HTTP'));
      });
    });
  });

module.exports = { fetchWeather };
