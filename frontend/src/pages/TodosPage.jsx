import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice'; // Імпорт екшену виходу
import AuthService from '../services/authService';  // Імпорт сервісу (перевір назву файлу!)
import RegBtn from '../components/ui/RegBtn';       // Твоя кнопка
import { fetchTodos, addTodo, deleteTodo } from '../store/slices/todoSlice';
import TodoInput from '../components/ui/TodoInput';
import RemoveBtn from '../components/ui/RemoveBtn';
import CreateBtn from '../components/ui/CreateBtn';

const TodosPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { items, isLoading, error } = useSelector(state => state.todos);
    const [taskText, setTaskText] = useState('')

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            await AuthService.logout();

            dispatch(logout());


        } catch (error) {
            console.log(error);
        }
    }
    
    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskText.trim()) return;
        dispatch(addTodo(taskText));
        setTaskText('');
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">
                Привіт, {user?.username} 👋
            </h1>
            {isLoading && (
                <div className="flex justify-center items-center my-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white transition "></div>
                </div>
            )}
            {error && <div className="text-red-500">Помилка: {error}</div>}
            {!isLoading && (
                <ul className="w-full max-w-md mt-4">
                    {items.map(todo => (
                        <li key={todo._id} className="p-3 bg-gray-800 rounded mb-2 flex justify-between">
                            {todo.text}
                            <RemoveBtn text="X" onClick={() => {handleDelete(todo._id)}}/>
                        </li>
                    ))}
                </ul>
            )}
            <form className="flex flex-col w-full max-w-md py-10" onSubmit={handleSubmit}>
                <TodoInput
                    value={taskText}
                    placeholder="enter your task"
                    id="taskText"
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <CreateBtn text="Create task" disabled={!taskText.trim()}/>
            </form>
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