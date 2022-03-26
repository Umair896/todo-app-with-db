const Todo = require("./todos.model");

const getTodos = (req, res) => {
  Todo.findAll({ row: true })
    .then((todos) => {
      return res.status(200).json({
        success: true,
        error: null,
        data: {
          todos: todos,
        },
      });
    })
    .catch((e) =>
      res.status(500).json({
        message: "Something went wrong",
      })
    );
};

const postTodo = (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).json({
      success: false,
      error: "Please provide the todo",
      data: null,
    });
  }

  Todo.create({
    title: text,
    description: req.body.description,
  })
    .then((todo) => {
      return res.status(201).json({
        success: true,
        error: null,
        data: {
          todos: todo,
        },
      });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

const deleteTodo = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(500).json({
      success: false,
      error: "Please provide id",
      data: null,
    });
  }

  Todo.destroy({
    where: {
      id: id,
    },
  })
    .then((deletedTodo) => {
      console.log(deletedTodo);
      if (deletedTodo) {
        return res.status(200).json({
          success: true,
          error: null,
          data: {},
        });
      }
    })
    .catch((e) =>
      res.status(500).json({
        success: false,
        error: "Something went wrong",
        data: null,
      })
    );
};

module.exports = {
  getTodos,
  postTodo,
  deleteTodo,
};
