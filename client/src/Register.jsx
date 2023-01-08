import React from 'react'
import { Link, useNavigate} from "react-router-dom";
import { CredentialsContext } from './App';
const handleErrors = async (response) => {
    if (!response.ok) {
        throw Error(await response.json())
    }
}
const Register = (e) => {
    const [username,setUsername] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [checkpassword,setCheckPassword] = React.useState("")
    const [error,setError] = React.useState("")
    const [,setCred] = React.useContext(CredentialsContext)
    const navigate = useNavigate();
    const [samePass,setSamePass] = React.useState(true)


    const register = (event) => {
        event.preventDefault()
        if (password !== checkpassword) {
            setSamePass(false)
        } else {
        fetch('http://localhost:4000/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        .then(handleErrors)
        .then(()=> {
            setCred(username)
            navigate("/todo")
        })
        .catch((error) => {
            setError("User already Exists")
        })
        } 
    }

    return (
        <div>
            <form className='login-form' onSubmit={register}>
                <h1>Register</h1>
                {error}
                {samePass == false && <h1 className='error-password'>Password does not match</h1>}
                <br></br>
                <div className='username-section'>
                    <label>Username:</label>
                    <input value={username} onChange={(event) => setUsername(event.target.value)} className='user-input' type="text"></input>
                </div>
                <div className='password-section'>
                    <label>Password:</label>
                    <input value={password} onChange={(event)=> setPassword(event.target.value)} className='password-input' type='password'></input>
                </div>
                <div className='password-section'>
                    <label className='repassword'>Re-Enter Password:</label>
                    <input value={checkpassword} onChange={(event)=> setCheckPassword(event.target.value)} className='repassword-input' type='password'></input>
                </div>
                <div className='to-login'>
                    <h1>Already have an account? <a href='/login'>Log In</a></h1>
                </div>
                <div className='buttons-section'>
                    <button type='submit'className='submit-button'>Submit</button>
                </div>
            </form> 
        </div>
  )
}

export default Register
