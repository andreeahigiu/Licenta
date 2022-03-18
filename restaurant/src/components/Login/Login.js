import React from 'react'
import { useHistory } from 'react-router-dom';
import './Login.css'

export default function Login() {
  const history = useHistory();
  const handleClick = () => history.push('/signup');
return (
  <div className="login-page">
    <div className="title">
      Log in
    </div>
    <div className='text-above'>
      Nu ai un cont? 
    <button onClick={handleClick}> Sign Up</button>
    </div>
  
    <form className="form">
        {/* Labels and inputs for form data */}
        <label className="label">
        <input name="email" type="email" placeholder="Email"/>
        </label>

        <label className="label">
        <input name="password" type="password" placeholder="Password"/>
        </label>

        <button className="login-btn" type="submit" > Log in </button>

      </form>
  

  </div>
)
  
}
