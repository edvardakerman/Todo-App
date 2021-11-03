const Todo = require("../models/todoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//CRUD operations
//CREATE one todo
const createOneTodo = catchAsync(async (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    return next(
      new AppError("You need to provide both title and description", 401)
    );
  }
  const { title, description } = req.body;

  const todo = {
    title,
    description,
  };

  const newTodo = await Todo.create(todo);
  res.status(201).json({
    status: "success",
    data: {
      todo: newTodo,
    },
  });
});

// READ get all todos
const readAllTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.find({});
  if (!todos) {
    return next(new AppError("No todos found.", 404));
  }
  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

// READ get one todo by id
const readOneTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findOne({ id: req.params.id });
  if (!todo) {
    return next(new AppError("No todo with that id found.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
});

// UPDATE one todo by id
// ADMIN ONLY
const updateOneTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findOne({ id: req.params.id });
  if (!todo) {
    return next(new AppError("No todo with that id found.", 404));
  }
  if (!req.body.title || !req.body.description) {
    return next(
      new AppError("You need to provide both title and description.", 404)
    );
  }
  const updatedTodo = await Todo.findOneAndUpdate({ id: todo.id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      todo: updatedTodo,
    },
  });
});

// DELETE one todo by id
// ADMIN ONLY
const deleteOneTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findOneAndDelete({ id: req.params.id });
  if (!todo) {
    return next(new AppError("No todo with that id found.", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createOneTodo,
  readAllTodos,
  readOneTodo,
  updateOneTodo,
  deleteOneTodo,
};
