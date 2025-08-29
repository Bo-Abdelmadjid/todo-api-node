const express = require("express");

const controller = require("../controllers/todoController");

const validateTodo = require("../middlewares/validateTodo");

const router = express.Router();

router.get("/", controller.getTodos);

router.get("/:id", controller.getTodo);

router.post("/", validateTodo, controller.createTodo);

router.put("/:id", validateTodo, controller.updateTodo);

//
router.delete("/:id", controller.deleteTodo);

module.exports = router;
