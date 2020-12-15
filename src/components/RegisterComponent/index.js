import React from 'react';


class RegisterComponent extends React.Component {

    render() {
        return (
        <div className='main-box'>
            <h1>registration</h1>
            <div className='first-name'>
                <span>First name</span>
                <input className='input' placeholder='First name'></input>
            </div>
            <div className='second-name'>
                <span>Second name</span>
                <input className='input' placeholder='Second name'></input>
            </div>
            <div className='email'>
                <span>Email</span>
                <input className='input' placeholder='Email'></input>
            </div>
            <div className='password'>
                <span>Password</span>
                <input className='input' placeholder='Password' type='password'></input>
            </div>
            <div className='password'>
                <span>Repeat Password</span>
                <input className='input' placeholder='Repeat password' type='password'></input>
            </div>
            <div className='btns'>
                <button id="123123" className='btn1'>Back</button>
                <button className='btn1'>Create account</button>
            </div>
        </div>
    );
    }
  
}


export default RegisterComponent;
