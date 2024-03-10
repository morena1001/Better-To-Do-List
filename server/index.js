var data = require('./db.json');

const path = require('path');
const express = require("express");
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;

const app = express();

server.use(middlewares);
server.use('/api', router);
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({message: "Hello from server!"});
});

// app.get("/api/words", (req, res) => {
//   res.send(data.words);
// });

app.get("/api/tasks", (req, res) => {
  res.send(data.tasks);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
