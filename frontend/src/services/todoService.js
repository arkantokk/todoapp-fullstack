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
        // ТУТ: Виклич $api.delete. Не забудь додати id в кінець URL
        return $api.delete(`/todos/${id}`)
    }

    // 4. Оновлення (наприклад, зміна тексту або статусу "виконано")
    static async updateTodo(id, updateData) {
        // ТУТ: Виклич $api.put. Потрібен і id в URL, і самі дані updateData
        return $api.put(`/todos/${id}`, updateData)
    }
}