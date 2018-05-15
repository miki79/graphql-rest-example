const yelp = require('yelp-fusion');

const apiKey = process.env.YELP_KEY;
const client = yelp.client(apiKey);

const fetchBusiness = (lat, lon) => {
  console.info(lat, lon);
  return client
    .search({
      limit: 5,
      latitude: lat,
      longitude: lon,
    })
    .then(response =>
      response.jsonBody.businesses.map(bus => ({
        id: bus.id,
        name: bus.name,
        price: bus.price,
        phone: bus.display_phone,
      })));
};
module.exports = {
  fetchBusiness,
};
