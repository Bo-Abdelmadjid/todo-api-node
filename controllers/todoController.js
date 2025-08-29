const Todo = require("../models/todoModel");

const createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({
      message: "New todo added successfully!",
      todo: todo,
    });
  } catch (error) {
    next(error);
  }
};
const getTodos = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.priority) query.priority = req.query.priority;

    const todos = await Todo.find(query);

    res.json(todos);
  } catch (error) {
    next(error);
  }
};

const getTodo = async (req, res, next) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Not found!" });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ error: "Not found!" });
    }
    res.json({
      message: "Todo updated successfully!",
      updatedTodo: todo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo)
      return res.status(404).json({
        error: "Not found!",
      });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
