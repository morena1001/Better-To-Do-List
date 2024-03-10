var data = require('./db.json');

const path = require('path');
const express = require("express");
const fs = require('fs');
// const bodyParser = require("body-parser");
// const jsonServer = require('json-server');

// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;
// var urlencodedParser = bodyParser.urlencoded({ extended: false })  
const app = express();

// server.use(middlewares);
// server.use('/api/tasks', router);
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api", (req, res) => {
  res.json({message: "Hello from server!"});
});

// app.get("/api/words", (req, res) => {
//   res.send(data.words);
// });

app.get("/api/tasks", (req, res) => {
  res.send(data.tasks);
});

app.post("/api/tasks", (req, res) => {
  response = {
    id: req.body.id,
    task: req.body.task,
    completed: req.body.completed
  }

  data.tasks.push(response);
  fs.writeFileSync("./server/db.json", JSON.stringify(data));

  console.log(response);
  res.send(JSON.stringify(response));
  // res.send(JSON.stringify(JSON.stringify(data)));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
