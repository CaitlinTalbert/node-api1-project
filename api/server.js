// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();

server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "error getting all users",
      error: err.message,
    });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: `user with id ${req.params.id} not found`,
      });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "error getting user id",
      error: err.message,
    });
  }
});

server.post("/api/users", async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      res.status(201).json({
        message: "name and bio required",
      });
    } else {
      const newUser = await Users.insert(req.body);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "error posting new user",
      error: err.message,
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
