// using Express.js
const express = require('express');
const app = express();

// using node.bcrypt.js
const bcrypt = require('bcrypt');

app.use(express.json());

const users = [];

// create a route
// GET request
app.get('/users', (req, res) => {
  res.json(users);
});

// POST request
app.post('/users', async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashed };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// create login
app.post('/users/login', async (req, res) => {
  const user = user.find(user => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send('User Not Found');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Logged In');
    } else {
      res.send('Username or password is incorrect');
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(3000);
