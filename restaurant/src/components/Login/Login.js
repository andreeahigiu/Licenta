// import React from 'react'
import { useHistory, Link } from 'react-router-dom';
import './Login.css'
import React, { useRef, useState, useCallback } from 'react'
import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from '../../contexts/AuthContext';
import { Alert } from "react-bootstrap"
import { Logout, SettingsBackupRestoreSharp } from '@mui/icons-material';



export default function Login( {setIsAuth} ) {
  let history = useHistory();
  // const handleClick = () => history.push('/signup');

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } =  useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { logout} = useAuth()

  const [state, setState] = React.useState({
    checkedA: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // async function handleLogout() {
  //   setError('')

  //   try {
  //     await logout()
  //     history.push('/')
  //   } catch {
  //     setError('Failed to log out')
  //   }
  // }

  
  async function handleSubmit(e) {
    e.preventDefault() //to prevent form from refreshing

    try {

      setError("")
      setLoading(true) //disabling the submit button so that the user does not create multiple accounts by mistake
      await login(emailRef.current.value, passwordRef.current.value)
      // localStorage.setItem("isAuth", true)
      // setIsAuth(true)
      history.push("/")
    }catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

return (
  <div className="login-page">
    <div className="title">
      Log in
    </div>
    <div className='text-above'>
      Nu ai un cont? 
    {/* <button onClick={handleClick}> Sign Up</button> */}
    <Link to ="/signup">Sign Up </Link>
    </div>

    {error && <Alert variant="danger">{error}</Alert>}
    <form className="form" onSubmit={handleSubmit}>
        {/* Labels and inputs for form data */}
        <label className="label">
        <input name="email" type="email" ref={emailRef} placeholder="Email"/>
        </label>

        <label className="label">
        <input name="password" type="password" ref={passwordRef} placeholder="Password"/>
        </label>

        <button disabled={loading} className="login-btn" type="submit" > Log in </button>
        {/* <button className="login-btn" onClick={handleLogout} > Log out </button> */}
      </form>
  

  </div>
)
  
}
