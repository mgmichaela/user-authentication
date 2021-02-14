const express = require("express");
const app = express();

const bcrypt = require("bcrypt");

app.use(express.json());

const users = [];

// create a route
// GET request
app.get("/users", (req, res) => {
  res.json(users);
});

// POST request
app.post("/users", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashed };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});



app.listen(3000);
