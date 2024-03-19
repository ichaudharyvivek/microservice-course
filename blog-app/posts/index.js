const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };

  res.status(200).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
