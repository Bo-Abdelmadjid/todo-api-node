const express = require("express");
const app = express();

let todos = [];
let id = 1;

app.use(express.json());

app.post("/todos", (req, res) => {
  const { task, done, priority } = req.body;

  if (priority !== "low" && priority !== "medium" && priority !== "high")
    return res.json({
      error: "Invalid priority. Must be low, medium, or high",
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
});

app.get("/todos", (req, res) => {
  const { priority } = req.query;
  let result = todos;
  if (priority) result = todos.filter((t) => t.priority === priority);
  res.json(result);

  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Not found!" });
  }

  res.json(todo);
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));

  if (!todo) {
    return res.status(404).json({ error: "Not found!" });
  }

  todo.task = req.body.task ?? todo.task;
  todo.done = req.body.done ?? todo.done;

  res.json({
    message: "Todo updated successfully!",
    updatedTodo: todo,
  });
});

//
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((item) => item.id !== Number(req.params.id));
  res.status(204).json();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${PORT}`)
);
