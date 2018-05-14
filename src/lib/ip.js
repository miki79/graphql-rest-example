const http = require('http');

const fetchIp = ip =>
  new Promise((resolve, reject) => {
    if (!ip) {
      reject(new Error('IP not defined'));
    } else {
      const url = `http://ip-api.com/json/${ip}`;
      http.get(url, (res) => {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', (data) => {
          body += data;
        });
        res.on('end', () => {
          body = JSON.parse(body);
          if (body.lat && body.lon) {
            return resolve(body);
          }
          return reject(new Error('Coordinates not found'));
        });
        res.on('error', () => {
          reject(new Error('Error HTTP'));
        });
      });
    }
  });

module.exports = { fetchIp };
