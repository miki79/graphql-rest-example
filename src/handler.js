const { fetchWeather } = require('./lib/weather');
const { fetchIp } = require('./lib/ip');

module.exports.weather = async ({ lat, lon }) => fetchWeather(lat, lon);

module.exports.ip = async (event) => {
  const ips = event.split(', ');
  const ip = ips[ips.length - 2];
  if (!ip) {
    return new Error('IP not defined');
  }
  return fetchIp(ip);
};
