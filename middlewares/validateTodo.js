const { body, validationResult } = require("express-validator");

const validateTodo = [
  body("task")
    .notEmpty()
    .withMessage("Task is required")
    .isLength({ min: 3 })
    .withMessage("Task must be at least 3 charachters long"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateTodo;
