const { fetchWeather } = require('./lib/weather');
const { fetchIp } = require('./lib/ip');
const { fetchBusiness } = require('./lib/business');

module.exports.coordinates = async (event, context, callback) => {
  // Test IP if in localhost
  const ip =
    event.requestContext.identity.sourceIp !== '127.0.0.1'
      ? event.requestContext.identity.sourceIp
      : '86.188.153.178';

  const response = {
    statusCode: 200,
    body: JSON.stringify(await fetchIp(ip)),
  };

  return callback(null, response);
};

module.exports.weather = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(await fetchWeather(event.pathParameters.lat, event.pathParameters.lon)),
  };

  callback(null, response);
};

module.exports.business = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(await fetchBusiness(event.pathParameters.lat, event.pathParameters.lon)),
  };

  callback(null, response);
};
