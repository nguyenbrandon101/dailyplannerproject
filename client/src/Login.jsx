import React from 'react'
import { Link, useNavigate} from "react-router-dom";
import Todo from './Todo';
const handleErrors = async (response) => {
    if (!response.ok) {
        throw Error(await response.json())
    }
}
const Login = () => {
    const [username,setUsername] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [error,setError] = React.useState("")
    const navigate = useNavigate();
    const loginUser = (event) => {
        event.preventDefault()
        fetch('http://localhost:4000/login', {
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
            navigate("/todo")
        })
        .catch((error) => {
            setError("Incorrect username/password")
        })
    } 
    return (
        <div>
            <form className='login-form' onSubmit={loginUser}>
                <h1>Log In</h1>
                {error}
                <div className='username-section'>
                    <label>Username:</label>
                    <input value={username} onChange={(event) => setUsername(event.target.value)} className='user-input' type="text"></input>
                </div>
                <div className='password-section'>
                    <label>Password:</label>
                    <input value={password} onChange={(event)=> setPassword(event.target.value)} className='password-input' type='password'></input>
                </div>
                <div className='buttons-section'>
                    <button type='submit'className='submit-button'>Submit</button>
                    <Link to="/">
                        <button type='submit'className='submit-button'>Register</button>
                    </Link>
                </div>
            </form> 
        </div>
  )
}

export default Login