import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice'; // Імпорт екшену виходу
import AuthService from '../services/authService';  // Імпорт сервісу (перевір назву файлу!)
import RegBtn from '../components/ui/RegBtn';       // Твоя кнопка

const TodosPage = () => {
    const dispatch = useDispatch();
    // Дістаємо email юзера, щоб бачити, хто зайшов
    const { user } = useSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            // 1. Запит на сервер (щоб видалити Refresh Token з кук)
            await AuthService.logout();
            
            // 2. Очистка Redux і LocalStorage (це робить наш редюсер logOut)
            dispatch(logout());
            
            // 3. Редірект на логін спрацює автоматично, 
            // бо спрацює твій охоронець RequireAuth (isAuth стане false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">
                Привіт, {user?.username} 👋
            </h1>
            
            <p className="mb-8 text-gray-400">
                Це захищена сторінка. Тільки авторизовані бачать це.
            </p>

            <div className="w-48">
                <RegBtn text="Вийти" onClick={handleLogout} />
            </div>
        </div>
    );
};

export default TodosPage;