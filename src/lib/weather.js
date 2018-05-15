const YQL = require('yql');

const fetchWeather = (lat, lon) => {
  const query = new YQL(`select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${lat},${lon})") and u='c'`);
  return new Promise((resolve, reject) => {
    query.exec((err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve({
        temperature: data.query.results.channel.item.condition.temp,
        description: data.query.results.channel.item.condition.text,
        icon: `http://l.yimg.com/a/i/us/we/52/${
          data.query.results.channel.item.condition.code
        }.gif`,
      });
    });
  });
};

module.exports = { fetchWeather };
