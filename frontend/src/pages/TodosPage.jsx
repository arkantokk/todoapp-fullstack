import { useSelector, useDispatch } from 'react-redux';
import { logout, changePassword } from '../store/slices/authSlice';
import AuthService from '../services/authService';
import RegBtn from '../components/ui/RegBtn';
import CalendarPage from '../components/ui/Calendar';
import { useState } from 'react';
import ChangePassModal from '../components/ChangePassModal';
import ModalMessage from '../components/ui/ModalMessage';

const TodosPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [isChangeOpen, setIsChangeOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const openChangeModal = () => {
        setIsChangeOpen(true);
    };

    const handleChangePassword = async (values) => {
        const result = await dispatch(changePassword(values));

        console.log("Result Action:", result);

        if (changePassword.fulfilled.match(result)) {
            setIsChangeOpen(false);
            alert("Password changed successfully! 🎉");
        } 
        else if (changePassword.rejected.match(result)) {
            const payload = result.payload;
            console.log("Error Payload:", payload);
            
            let text = "Something went wrong";

            if (payload?.errors?.length > 0) {
                text = payload.errors[0].msg;
            } 
            else if (payload?.message) {
                text = payload.message;
            } 
            else if (typeof payload === 'string') {
                text = payload;
            }
            
            console.log("Setting error text to:", text);
            setErrorMessage(text);
        }
    };

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            dispatch(logout());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <header className="p-6 flex justify-between items-center bg-gray-800 shadow-md">
                <h1 className="text-2xl font-bold">
                    Hi, {user?.username} 👋
                </h1>

                <div className="w-32">
                    <RegBtn text="Logout" onClick={handleLogout} />
                </div>
            </header>

            <main className="flex-1 p-4 overflow-hidden">
                <CalendarPage />
            </main>

            <footer className="p-4 text-center text-gray-500 text-sm flex flex-col">
                It is secured page. Only you can see it.
                <button
                    className='bg-neutral-600 w-1/2 mx-auto mt-3 rounded-lg text-xl text-white py-2 hover:bg-neutral-500 transition'
                    onClick={openChangeModal}
                >
                    Change Password
                </button>
            </footer>

            <ChangePassModal
                isOpen={isChangeOpen}
                onClose={() => setIsChangeOpen(false)}
                onSubmit={handleChangePassword}
            />

            <ModalMessage
                isOpen={!!errorMessage}
                onClose={() => setErrorMessage(null)}
                error={errorMessage}
                title="Change Failed"
            />
        </div>
    );
};

export default TodosPage;