const todoService = require('../services/todo.service');


class TodoController {
    async createTodo(req, res) {
        try {
            const { text } = req.body;
            const userId = req.user.id
            const todo = await todoService.create({ text }, userId);

            res.status(201).json("succesfully created task")
        } catch (err) {
            console.log(err);
            res.status(500).json("Error when creating task")
        }
    }

    async getTodos(req, res) {
        try {
            const userId = req.user.id;
            const todos = await todoService.getAllTodos(userId);

            res.status(200).json(todos);
        } catch (error) {
            console.log(error);
            res.status(500).json("Error when reading tasks")
        }
    }

    async deleteTodo(req, res) {
        try {
            const taskId = req.params.id;
            const userId = req.user.id;

            const deletedTodo = await todoService.deleteTodo(taskId, userId);
            if (!deletedTodo) {
                return res.status(404).json({ message: "Todo not found" });
            }

            res.status(200).json({ message: "Todo deleted", id: taskId });

        } catch (error) {
            console.log(error);
            res.status(500).json("Error when deleting tasks")
        }
    }

    async updateTodo(req, res) {
        try {
            const todoId = req.params.id;
            const userId = req.user.id;
            const updateData = req.body;

            const updatedTodo = await todoService.updateTodo(todoId, userId, updateData);

            if (!updatedTodo) {
                return res.status(400).json({ message: "Todo not updated" });
            }

            res.status(200).json(updateData);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }
}

module.exports = new TodoController();