const express = require('express');
const axios = require('axios');
const app = express();

const config = require('./config');

app.use(express.json());
app.use(express.urlencoded(true));

app.post('/events', (req, res) => {
  const event = req.body;
  axios
    .post(`https://${config.services.POST_SERVICE}/events`, event)
    .catch((err) => console.log(err));

  axios
    .post(`https://${config.services.COMMENT_SERVICE}/events`, event)
    .catch((err) => console.log(err));

  axios
    .post(`https://${config.services.QUERY_SERVICE}/events`, event)
    .catch((err) => console.log(err));

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
