const { fetchWeather } = require('./lib/weather');
const { fetchIp } = require('./lib/ip');
const { fetchBusiness } = require('./lib/business');

module.exports.weather = async ({ lat, lon }) => fetchWeather(lat, lon);

module.exports.ip = async (event) => {
  const ips = event.split(', ');
  const ip = ips[ips.length - 2];
  if (!ip) {
    return new Error('IP not defined');
  }
  return fetchIp(ip);
};

module.exports.business = async ({ lat, lon }) => fetchBusiness(lat, lon);
