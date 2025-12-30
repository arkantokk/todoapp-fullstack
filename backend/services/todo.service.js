const Todo = require('../models/Todo');

class TodoService {
    async create(todoData, userId) {
        const todo = await Todo.create({
            ...todoData,
            owner: userId
        })

        return todo;
    }

    async getAllTodos(userId, page = 1 , limit = 10) {
        const skip = (page - 1) * limit;
        const todos = await Todo.find({ owner: userId }).sort({createdAt: -1}).skip(skip).limit(limit);
        const totalTodos = await Todo.countDocuments({owner: userId});

        return {
            data: todos,
            total: totalTodos,
            page: page,
            limit: limit
        };
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

    async getCalendarTasks(userId, startDate, endDate){
        const todos = await Todo.find({
            owner: userId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
        .sort({date: 1})
        return todos;
    }
}

module.exports = new TodoService();