import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import AuthService from '../services/authService';
import RegBtn from '../components/ui/RegBtn';
import CalendarPage from '../components/ui/Calendar'; // Або '../components/ui/Calendar' залежно від того, де ти його зберіг

const TodosPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            dispatch(logout());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* ХЕДЕР СТОРІНКИ */}
            <header className="p-6 flex justify-between items-center bg-gray-800 shadow-md">
                <h1 className="text-2xl font-bold">
                    Привіт, {user?.username} 👋
                </h1>
                <div className="w-32">
                    <RegBtn text="Вийти" onClick={handleLogout} />
                </div>
            </header>

            {/* ОСНОВНИЙ КОНТЕНТ - КАЛЕНДАР */}
            <main className="flex-1 p-4 overflow-hidden">
                {/* Вставляємо компонент календаря сюди */}
                <CalendarPage /> 
            </main>

            <footer className="p-4 text-center text-gray-500 text-sm">
                Це захищена сторінка. Тільки авторизовані бачать це.
            </footer>
        </div>
    );
};

export default TodosPage;