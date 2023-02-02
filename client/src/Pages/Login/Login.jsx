import React, {useState} from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass]= useState('');

    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log(email);

    }
    return (
       
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
        
    )
}