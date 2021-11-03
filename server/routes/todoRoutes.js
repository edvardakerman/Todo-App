const express = require("express");

const {
  createOneTodo,
  readAllTodos,
  readOneTodo,
  updateOneTodo,
  deleteOneTodo,
} = require("../controllers/todoControllers");

const router = express.Router();

router.post("/", createOneTodo);

router.get("/", readAllTodos);

router.get("/:id", readOneTodo);

router.post("/:id", updateOneTodo);

router.delete("/:id", deleteOneTodo);

module.exports = router;
