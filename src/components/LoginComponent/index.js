import React from 'react';
import './login.css';

class LoginComponent extends React.Component {

    render() {
        return (
        <div className='main-box'>
            <h1>login</h1>
            <div className='field'>
                <span>Email</span>
                <input placeholder='Email' className="input"></input>
            </div>
            <div className='field'>
                <span>Password</span>
                <input type='password' placeholder='Password' className="input"></input>
            </div>
            <div className='btns'>
                <button className='btn1'>Sign In</button>
                <span>or</span>
                <a href='/login' className='a1'>create an account</a>
            </div>
        </div>
    );
    }
  
}

export default LoginComponent;
