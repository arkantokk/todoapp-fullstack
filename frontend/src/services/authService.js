import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/auth/login', { email, password });
    }

    static async registration(email, password, username) {
        return $api.post('/auth/registration', { email, password, username });
    }

    static async logout() {
        return $api.post('/auth/logout');
    }
}