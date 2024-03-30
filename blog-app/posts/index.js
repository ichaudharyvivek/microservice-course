const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { randomBytes } = require("crypto");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

/*

  Data model:
  {
    id: { id, title }
  }

*/
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(200).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Events: ", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
