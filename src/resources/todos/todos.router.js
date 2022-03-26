const { Router } = require("express");
const { getTodos, postTodo, deleteTodo } = require("./todos.controller");

const router = Router();

// router.get("/", getTodos);
// router.post("/", postTodo);
// router.delete("/:id", deleteTodo);

router.route("/").get(getTodos).post(postTodo);
router.route("/:id").delete(deleteTodo);

module.exports = router;
