import React, {useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../Components/UserContext/UserContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../Constants/Constants";
import { Navigation } from "../../Components/Navigation/Navigation";


export const Login =(props)=> {
    const [email, setEmail] = useState('');
    const [pass, setPass] =  useState('');
    const navigate = useNavigate();
    const [ setError] = useState('');
    const { setUser } = useContext(UserContext);

    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log(email);
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, pass })
        })
            .then(res => {
                if (res.status === 401) {
                    throw new Error('Incorrect username or password');
                }
    
                if (!res.ok) {
                    throw new Error('Something went wrong');
                }
                return res.json();
            })
            .then(data => {
                const { id, email, token } = data;
                localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
                setUser({ id, email });
                navigate('/');
                setError('');
            })
            .catch((e) => {
                setError(e.message);
            })
    

    }
    return (
        <>
        <Navigation />

        <div className="auth-form-container">
            <h2>LOGIN</h2>
        <form className= "login-form" onSubmit ={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value = {email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="your.email@gmail.com" id="email" name="email"/>
            <label htmlFor="password">password</label>
            <input value = {pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***************" id="password" name="password"/>
            <button className="login" type="submit">Login</button>
        </form>
        <button className="switch" onClick={() => props.onFormSwitch('register')}>Dont't have an account? Register here!</button>
        
        </div>
        </>
        
    )
    }