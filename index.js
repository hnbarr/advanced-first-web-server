
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
const state = require('./state')


app.get('/users', (req, res) => {res.send(state.users)})


app.get('/users/1', (req, res) => {res.json(state.users[0])})


app.post('/users', (req, res) => {
  state.users.push({ name: "Fox Mulder" });
  res.json(state.users[state.users.length - 1]); //returning last item, new item
})

app.put('/users/1', (req, res) => {res.json(state.users[0])})


app.delete('/users', (req, res) => {
  state.users.shift();
  res.send('deleted') //returning that user was deleted
})


app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))