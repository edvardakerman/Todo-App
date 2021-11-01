var express = require("express");
var router = express.Router();

let Todolist = [
  {
    task_id: 1,
    task_title: "Köp mjölk",
    task_body: "Gå till ica och köp två liter mjölk",
    task_status: "True",
  },
  {
    task_id: 2,
    task_title: "Köp kanelbullar",
    task_body: "Gå till ica och köp kanelbullar",
    task_status: "false",
  },
];

// get all
router.get("/api/todo", function (req, res, next) {
  res.json(Todolist);
});

// post
router.post("/api/todo", function (req, res, next) {
  Todolist.push(req.body);
  console.log("item created");
  res.json(Todolist);
});

// get one
router.get("/api/todo/:id", function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const item = Todolist.find((item) => {
    return item.task_id === itemId;
  });
  res.json(item);
});

// delete
router.delete("/api/todo/:id", function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const removeIndex = Todolist.findIndex((item) => item.id === itemId);
  Todolist.splice(removeIndex, 1);
  console.log("item deleted");
  res.json(Todolist);
});

// update
router.post("/api/todo/:id", function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const item = Todolist.find((item) => {
    return item.task_id === itemId;
  });

  const updatedItem = req.body;
  item.task_title = updatedItem.task_title;
  item.task_body = updatedItem.task_body;
  console.log("item updated");
  res.json(item);
});

module.exports = router;
