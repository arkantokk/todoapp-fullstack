const Todo = require('../models/Todo');

class TodoService {
    async create(todoData, userId) {
        const todo = await Todo.create({
            ...todoData,
            owner: userId
        })

        return todo;
    }

    async getAllTodos(userId) {
        const todos = await Todo.find({ owner: userId });
        return todos;
    }

    async deleteTodo(todoId, userId) {
        const todo = await Todo.findOneAndDelete({
            _id: todoId,
            owner: userId
        })
        return todo;
    }

    async updateTodo(todoId, userId, updateData) {
        const todo = await Todo.findOneAndUpdate({
            _id: todoId,
            owner: userId,
        },
            updateData,
            { new: true }
        )
        return todo;
    }
}

module.exports = new TodoService();