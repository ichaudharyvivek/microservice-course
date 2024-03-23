const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const config = require('../config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

/*

  Data model:
  {
    postId:{
      id (postId),
      title,
      comments: [{id (commentId), content}]
    }
  }

*/
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
      const { id: commentId, content, postId, status } = data;
      const post = posts[postId];
      post.comments.push({ id: commentId, content, status });
      break;

    default:
      break;
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }

  console.log(posts);
  res.status(200).json({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
