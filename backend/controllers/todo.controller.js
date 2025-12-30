const todoService = require('../services/todo.service');


class TodoController {
    async createTodo(req, res) {
        try {
            const { text, date } = req.body;
            const userId = req.user.id
            const todo = await todoService.create({ text, date }, userId);

            res.status(201).json(todo);
        } catch (err) {
            console.log(err);
            res.status(500).json("Error when creating task")
        }
    }

    async getTodos(req, res) {
        try {
            const userId = req.user.id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const todos = await todoService.getAllTodos(userId, page, limit);

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

            res.status(200).json(updatedTodo);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }

    async getCalendarTodos(req, res) {
        try {
            const start = req.query.start;
            const end = req.query.end;
            if(!start || !end){
                return res.status(400).json("Bad request: start and end required")
            }
            const userId = req.user.id;
            const todos = await todoService.getCalendarTasks(userId, start, end);

            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json("Server error")
        }
    }
}

module.exports = new TodoController();