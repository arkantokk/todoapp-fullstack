import $api from "../http";

export class TodoService {
    static async fetchTodos() {
        return $api.get('/todos')
    }
    static async createTodo(text) {
        return $api.post('/todos', {text: text})
    }

    // 3. Видалення
    static async deleteTodo(id) {
        return $api.delete(`/todos/${id}`)
    }

    // 4. Оновлення (наприклад, зміна тексту або статусу "виконано")
    static async updateTodo(id, updatedData) {

        return $api.put(`/todos/${id}`, updatedData)
    }
}