const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post("http://posts-srv:4000/events", event);
  axios.post("http://comments-srv:4001/events", event);
  axios.post("http://query-srv:4002/events", event);
  axios.post("http://moderation-srv:4003/events", event);

  res.status(200).json({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.status(200).json(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
