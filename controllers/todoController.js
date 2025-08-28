let todos = [];
let id = 1;

const createTodo = (req, res, next) => {
  try {
    const { task, done = false, priority } = req.body;

    if (priority !== "low" && priority !== "medium" && priority !== "high")
      return res.status(400).json({
        error: "Invalid priority. Must be low, medium, or high",
      });
    if (!task)
      return res.status(400).json({
        error: "Task is required!",
      });

    const newTodo = {
      id: id++,
      task,
      done,
      priority,
    };

    todos.push(newTodo);

    res.status(201).json({
      message: "New todo added successfully!",
      todo: newTodo,
    });
  } catch (error) {
    next(error);
  }
};
const getTodos = (req, res, next) => {
  try {
    const { priority } = req.query;
    let result = todos;
    if (priority) result = todos.filter((t) => t.priority === priority);
    res.json(result);

    res.json(todos);
  } catch (error) {
    next(error);
  }
};

const getTodo = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).json({ error: "Not found!" });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = (req, res, next) => {
  try {
    const todo = todos.find((t) => t.id === Number(req.params.id));

    if (!todo) {
      return res.status(404).json({ error: "Not found!" });
    }

    if (
      req.body.priority !== "low" &&
      req.body.priority !== "medium" &&
      req.body.priority !== "high"
    )
      return res.status(400).json({
        error: "Invalid priority. Must be low, medium, or high",
      });
    todo.task = req.body.task ?? todo.task;
    todo.done = req.body.done ?? todo.done;
    todo.priority = req.body.priority ?? todo.priority;

    res.json({
      message: "Todo updated successfully!",
      updatedTodo: todo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = (req, res, next) => {
  try {
    const prevLength = todos.length;
    todos = todos.filter((item) => item.id !== Number(req.params.id));
    if (todos.length === prevLength)
      return res.status(404).json({
        error: "Not found!",
      });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
