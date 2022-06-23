import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom"
import './Login.css'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleClick = () => history.push('/signup');

  console.log(currentUser)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)

      // setIsAuth(true)
      // localStorage.setItem("isAuth", true)

      history.push("/")
      window.location.reload(false);
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="login-layout">
          <h2 className="title">Log In</h2>
          <div className="text-above">
          Nu ai cont? <Link className="link-button" to="/signup">Sign Up</Link>
          </div> 

          {error && <Alert variant="danger">{error}</Alert>}
          {/* {currentUser.email} */}

          <form className="form" onSubmit={handleSubmit}>
            <label className="label">
            <input className="input-login" name="email" type="email" ref={emailRef} required placeholder="Email"/>
            </label>

            <label className="label">
            <input className="input-login" name="password" type="password" ref={passwordRef} required placeholder="Parola"/>
            </label>

            <button disabled={loading} className="login-btn" type="submit">
              Log In
            </button>
          </form>
      </div>
    </>
  )
}