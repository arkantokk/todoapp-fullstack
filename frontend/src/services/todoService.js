import $api from "../http";

export class TodoService {
    static async fetchTodos() {
        return $api.get('/todos')
    }
    static async createTodo(payload) {
        return $api.post('/todos', payload)
    }


    static async deleteTodo(id) {
        return $api.delete(`/todos/${id}`)
    }


    static async updateTodo(id, updatedData) {

        return $api.put(`/todos/${id}`, updatedData)
    }
}