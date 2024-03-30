const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

/*

  Data model:
  {
    postId:{
      id (postId),
      title,
      comments: [{id (commentId), content, status}]
    }
  }

*/
const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.status(200).json({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  const res = await axios.get("http://event-bus-srv:4005/events");
  for (let event of res.data) {
    console.log(`Processing event: ${event.type}`);
    handleEvent(event.type, event.data);
  }
});
