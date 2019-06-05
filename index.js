const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000 
const state = require('./state')

app.use(bodyParser.json());
let lastId = state.users[state.users.length - 1]._id;

app.get('/users', (req, res) => {res.send(state.users)}) //working, returning all users
app.get('/users/:userId', (req, res) => {
  const reqUser = state.users.find(user => user._id == req.params.userId);
  reqUser && res.send(reqUser); //if true, res.send
}) //working, returning only user I ask for

app.post('/users', (req, res) => {
  const newUser = req.body;
  lastId++;
  newUser._id = lastId;
  state.users.push(newUser);
  res.json(newUser); 
})

app.put('/users/:userId', (req, res) => {
  const userIndex = state.users.findIndex(
    user => user._id == req.params.userId
  );
  if (userIndex > -1) {
    state.users[userIndex].occupation = "prosk8er";
    res.json(state.users[userIndex]);
  } else {
    res.send("not a valid userId");
  }
}) //working, changing the occupation to any user I select.

app.delete('/users/:userId', (req, res) => {
  const userIndex = state.users.findIndex(
    user => user._id == req.params.userId
  );
  if (userIndex > -1) {
    state.users[userIndex].isActive = false;
    res.send(`deleted`);
  } else {
    res.send("not a valid userId");
  }
}) // working, deleting and returning deleted.

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))