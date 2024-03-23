const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { randomBytes } = require('crypto');
const app = express();

const config = require('../config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

/*

  Data model:
  {
    "postId":[
      { id (commentId), content },
    ]
  }

*/
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;

  await axios.post(`https://${config.services.EVENT_BUS}/events`, {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id, status: 'pending' },
  });

  res.status(200).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Received Events: ', req.body.type);

  const { type, data } = req.body;

  switch (type) {
    case 'CommentModerated':
      const { id, postId, status, content } = data;
      const comments = commentsByPostId[postId];
      const comment = comments.find((comment) => comment.id === id);
      comment.status = status;

      await axios.post(`https://${config.services.EVENT_BUS}/events`, {
        type: 'CommentUpdated',
        data: {
          id,
          postId,
          status,
          content,
        },
      });
      break;

    default:
      break;
  }
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
