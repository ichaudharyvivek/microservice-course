const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const config = require('../config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

const posts = {};

app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case 'PostCreated':
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;

    case 'CommentCreated':
      const { id: commentId, content, postId } = data;
      const post = posts[postId];
      post.comments.push({ id: commentId, content });
      break;

    default:
      break;
  }

  res.status(200).json({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
