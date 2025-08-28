const express = require("express");
const router = express.Router();

const controller = require("../controllers/todoController");


router.post("/", controller.createTodo);

router.get("/", controller.getTodos);

router.get("/:id", controller.getTodo);

router.put("/:id", controller.updateTodo);

//
router.delete("/:id", controller.deleteTodo);

module.exports = router;
