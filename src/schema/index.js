const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const { fetchWeather } = require('../lib/weather');
const { fetchIp } = require('../lib/ip');
const { fetchBusiness } = require('../lib/business');

const typeDefs = fs.readFileSync(`${__dirname}/../../schema.graphql`);

const resolvers = {
  Query: {
    ip: (root, args, { ip }) => fetchIp(ip),
    weatherInfo: (root, { lon, lat }) => fetchWeather(lat, lon),
    businessesInfo: (root, { lon, lat }) => fetchBusiness(lat, lon),
  },
  IP: {
    weather: root => fetchWeather(root.lat, root.lon),
    businesses: root => fetchBusiness(root.lat, root.lon),
  },
};

module.exports = makeExecutableSchema({
  typeDefs: typeDefs.toString(),
  resolvers,
});
