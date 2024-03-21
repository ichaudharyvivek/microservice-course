const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const config = require('../config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

app.post('/events', (req, res) => {
  console.log('Received Events: ', req.body.type);
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
