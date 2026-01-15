import '../styles/Register.css'
import RegInput from '../components/ui/RegInput'
import RegBtn from '../components/ui/RegBtn'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword, validateUsername } from '../utils/validators';


import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import AuthService from '../services/authService';
const Register = () => {
    // OLD USE STATES 
    // 
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [emailError, setEmailError] = useState('not correct email ')
    // const [passwordError, setPasswordError] = useState('not correct password ')
    // const [emailDirty, setEmailDirty] = useState(false)
    // const [passwordDirty, setPasswordDirty] = useState(false)
    const [formValid, setFormValid] = useState(false)
    const [serverError, setServerError] = useState('')
    const [values, setValues] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [errors, setErrors] = useState({
        email: "Email can't be empty",
        password: "Password can't be empty",
        username: "Username can't be empty"
    });
    const [dirty, setDirty] = useState({
        email: false,
        password: false,
        username: false
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (errors.email || errors.password || errors.username) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [errors]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        let error = "";
        if (name === 'email') error = validateEmail(value);
        if (name === 'password') error = validatePassword(value);
        if (name === 'username') error = validateUsername(value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }))
    }

    const handleBlur = (e) => {
        const { name } = e.target;

        setDirty(prev => ({
            ...prev,
            [name]: true
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValid) return;
        try {
            const response = await AuthService.registration(values.email, values.password, values.username);

            console.log("Registration success:", response.data);
            localStorage.setItem('token', response.data.accessToken);

            dispatch(setCredentials(response.data));
            navigate('/');
        } catch (error) {
            console.log(error);
            const serverMessage = error.response?.data?.message;
            setServerError(serverMessage);
        }
        console.log("Works", values)
    }


    // OLD VERSION WITH DIFFERENT HANDLERS
    //
    //
    // const emailHandler = (e) => {
    //     setEmail(e.target.value)
    //     if (!e.target.value.match(
    //         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     )) {
    //         setEmailError("Email is not corrent")
    //     } else {
    //         setEmailError('')
    //     }
    // }

    // const passwordHandler = (e) => {
    //     setPassword(e.target.value)
    //     if (e.target.value.length < 5) {
    //         setPasswordError('Too short password')
    //     } else {
    //         setPasswordError('')
    //     }
    // }



    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900 px-4'>
            <div className='bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md'>

                <h1 className='text-3xl font-bold text-center text-white mb-8'>
                    Registration
                </h1>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    {serverError && (
                        <div style={{ color: 'red', marginBottom: '10px' }}>
                            {serverError}
                        </div>
                    )}
                    {/* Email RegInput */}
                    <RegInput
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}

                        error={(dirty.email && errors.email) ? errors.email : ""}
                    />
                    {/* Username RegInput */}
                    <RegInput
                        id="username"
                        name="username"
                        type="text"
                        label="Username"
                        placeholder="Enter your username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}

                        error={(dirty.username && errors.username) ? errors.username : ""}
                    />
                    {/* Password RegInput */}
                    <RegInput
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(dirty.password && errors.password) ? errors.password : ""}
                    />

                    <div className='mt-4'>
                        <RegBtn
                            text="Register"
                            type="submit"
                            disabled={!formValid}
                        >
                            Register
                        </RegBtn>
                    </div>

                </form>

                <p className='text-center text-gray-400 mt-6 text-sm'>
                    Already created account{' '}
                    <Link to="/login" className='text-pink-400 hover:text-pink-300 font-medium transition-colors'>
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;