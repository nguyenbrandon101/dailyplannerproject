import React from 'react'
import { Link, useNavigate} from "react-router-dom";

const handleErrors = async (response) => {
    if (!response.ok) {
        throw Error(await response.json())
    }
}
const Register = (e) => {
    const [username,setUsername] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [error,setError] = React.useState("")
    const navigate = useNavigate();
    const register = (event) => {
        event.preventDefault()
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
            navigate("/login")
        })
        .catch((error) => {
            setError("User already Exists")
        })
    } 

    return (
        <div>
            <form className='login-form' onSubmit={register}>
                <h1>Register</h1>
                {error}
                <br></br>
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
                    <Link to="/login">
                        <button type='submit'className='submit-button'>Log-In</button>
                    </Link>
                </div>
            </form> 
        </div>
  )
}

export default Register