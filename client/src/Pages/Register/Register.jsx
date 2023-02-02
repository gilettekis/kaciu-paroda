import React, {useState} from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass]= useState('');
    const [name] = useState('');
    const [surname] = useState('');

    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log(email);
    }
    return (
        <div className="auth-form-container">
            <h2>REGISTER</h2>
        <form className="register-form"onSubmit ={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input value = {name} name = "name" id= "name" placeholder="Your Name"/>
            <label htmlFor = "surname">Surname</label>
            <input value = {surname} name = "surname" id= "surname" placeholder="Your Surname"/>
            <label htmlFor ="email">email</label>
            <input value = {email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="your.email@gmail.com" id="email" name="email"/>
            <label htmlFor="password">password</label>
            <input value = {pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***************" id="password" name="password"/>
            <button className="reg" type="submit">Register</button>
        </form>
        <button className="switch" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here!</button>
        </div>
    )
}