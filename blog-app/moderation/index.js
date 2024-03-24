const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const config = require('../config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    axios.post(`https://${config.services.EVENT_BUS}/events`, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
