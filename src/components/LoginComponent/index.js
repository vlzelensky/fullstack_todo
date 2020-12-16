import React from 'react';
import './login.css';
import RegisterComponent from '../RegisterComponent'

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: true,
        };

    }

    changeStatus = () => {
        this.setState(state => ({status: !state.status}));
    }

    
    render() {
        if (this.state.status === true) {
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
                        <span href='/login' className='a1' onClick={this.changeStatus}>create an account</span>
                    </div>
                </div>
            )
        } else {
            return (<RegisterComponent changeStatus={this.changeStatus}/>)
        }

    };
  
}

export default LoginComponent;