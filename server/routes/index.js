var express = require('express');
var router = express.Router();

const lists = [
  {
    'id': 1,
    'task': 'Köp mjölk',
    'content': 'Gå till ica och köp två liter mjölk'
  },
  {
    'id': 2,
    'task': 'Köp kanelbullar',
    'content': 'Gå till ica och köp kanelbullar'
  },
]

// get all
router.get('/api/todo', function (req, res, next) {
  console.log(req.query.query);
  res.json(lists);
});

// post
router.post('/api/todo', function (req, res, next) {
  lists.push(req.body);
  res.json(lists);
});

// get one
router.get('/api/todo/:id', function (req, res, next) {
  var id = req.params.id - 1;
  res.json(lists[id]);
});

module.exports = router;
