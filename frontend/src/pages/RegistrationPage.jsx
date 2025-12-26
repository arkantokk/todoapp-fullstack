import '../styles/Register.css'
import RegInput from '../components/ui/RegInput'
import RegBtn from '../components/ui/RegBtn'
import { useEffect, useState } from 'react'
import { Link } from "react-router";
import { validateEmail } from '../utils/validators';
import { validatePassword } from '../utils/validators';

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

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: "Email can't be empty",
        password: "Password can't be empty"
    });
    const [dirty, setDirty] = useState({
        email: false,
        password: false
    });

    useEffect(() => {
        if (errors.email || errors.password) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Zaebis", values)
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