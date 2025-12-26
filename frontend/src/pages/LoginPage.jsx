import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import AuthService from "../services/authService";
import RegInput from "../components/ui/RegInput";
import RegBtn from "../components/ui/RegBtn";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            console.log("Login success:", response.data);
            dispatch(setCredentials(response.data));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">

            <div className='bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md'>

                <h1 className='text-3xl font-bold text-center text-white mb-8'>Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <RegInput
                        id="email"
                        value={email}
                        placeholder="Email"
                        label="Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                    />
                    <RegInput
                        id="password"
                        value={password}
                        placeholder="Password"
                        label="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <div className="mt-4">
                        <RegBtn
                            text="Login"
                            type="submit"
                            disabled={!email || !password}
                        />
                    </div>
                </form>

                <p className='text-center text-gray-400 mt-6 text-sm'>
                    Don't have an account?{' '}
                    <Link to="/registration" className='text-pink-400 hover:text-pink-300 font-medium transition-colors'>
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login;
