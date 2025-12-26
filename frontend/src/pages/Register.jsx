import '../styles/Register.css'
import RegInput from '../ui/RegInput'
import RegBtn from '../ui/RegBtn'
import { useEffect, useState } from 'react'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('not correct email ')
    const [passwordError, setPasswordError] = useState('not correct password ')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [formValid, setFormValid] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleBlur = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        if (!e.target.value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setEmailError("Email is not corrent")
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 5) {
            setPasswordError('Too short password')
        } else {
            setPasswordError('')
        }
    }

    useEffect(() => {
        if(emailError || passwordError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    }, [emailError, passwordError])

    return (
        <>
            <main className='main-container'>
                <form className="registerForm" onSubmit={handleSubmit}>
                    <div className='form-group'>
                        {(emailError && emailDirty) && (<div style={{ color: "red" }}>{emailError}</div>)}
                        <label htmlFor='email'>Email:</label>
                        <RegInput
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => emailHandler(e)}
                            onBlur={e => handleBlur(e)}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='form-group'>
                        {(passwordError && passwordDirty) && (<div style={{ color: "red" }}>{passwordError}</div>)}
                        <label htmlFor='password'>Password:</label>
                        <RegInput
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => passwordHandler(e)}
                            onBlur={e => handleBlur(e)}
                            placeholder='Enter your Password'
                        />

                    </div>
                    <RegBtn
                        text="Register"
                        type="submit"
                        disabled={!formValid}
                    />
                </form>


            </main >
        </>
    )
}

export default Register