var express = require('express');
var router = express.Router();

const Todolist = [
  {
    id: 1,
    title: 'Köp mjölk',
    body: 'Gå till ica och köp två liter mjölk'
  },
  {
    id: 2,
    title: 'Köp kanelbullar',
    body: 'Gå till ica och köp kanelbullar'
  },
]

// get all
router.get('/api/todo', function (req, res, next) {
  res.json(Todolist);
});

// post
router.post('/api/todo', function (req, res, next) {
  Todolist.push(req.body);
  res.json(Todolist);
});

// get one
router.get('/api/todo/:id', function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const item = Todolist.find((item) => {
    return item.id === itemId
  });
  res.json(item);
});

// delete
router.delete('/api/todo/:id', function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const removeIndex = Todolist.findIndex(item => item.id === itemId);
  Todolist.splice(removeIndex, 1);
  res.json(Todolist);
});

// update
router.post('/api/todo/:id', function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const item = Todolist.find((item) => {
    return item.id === itemId
  });

  const updatedItem = req.body;
  item.title = updatedItem.title;
  item.body = updatedItem.body;

  res.json(item);
})

module.exports = router;
