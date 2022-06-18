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
          {/* <div >
            <Link className="forgot-password" to="/forgot-password">Forgot Password?</Link>
          </div> */}
      </div>
    </>
  )
}
// export default function Login() {
//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const { login, currentUser } = useAuth()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const history = useHistory()

//   async function handleSubmit(e) {
//     e.preventDefault()

//     try {
//       setError("")
//       setLoading(true)
//       await login(emailRef.current.value, passwordRef.current.value)
//       history.push("/")
//     } catch {
//       setError("Failed to log in")
//     }

//     setLoading(false)
//   }

//   return (
//     <>
//  <div className="login-page">

//           <h2 className="text-center mb-4">Log In</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           {currentUser.email}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" ref={passwordRef} required />
//             </Form.Group>
//             <Button disabled={loading} className="w-100" type="submit">
//               Log In
//             </Button>
//           </Form>
//           <div className="w-100 text-center mt-3">
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </div>



//       <div className="w-100 text-center mt-2">
//         Need an account? <Link to="/signup">Sign Up</Link>
//       </div>
//       </div>
//     </>
//   )
// }


















// // import React from 'react'
// import { useHistory, Link } from 'react-router-dom';
// import './Login.css'
// import React, { useRef, useState, useCallback } from 'react'
// import { Switch } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { useAuth } from '../../contexts/AuthContext';
// import { Alert } from "react-bootstrap"
// import { Logout, SettingsBackupRestoreSharp } from '@mui/icons-material';



// export default function Login( ) {

//   // const handleClick = () => history.push('/signup');

//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const { login, currentUser } =  useAuth()
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const { logout } = useAuth()
//   const history = useHistory();

//   // const [state, setState] = React.useState({
//   //   checkedA: false
//   // });

//   // const handleChange = (event) => {
//   //   setState({ ...state, [event.target.name]: event.target.checked });
//   // };

//   // function handleClick(){
//   //   history.push('/signup')
//   // }

//   // async function handleLogout(e) {
//   //   setError('')

//   //   try {
//   //     await logout()
//   //     history.push('/')
//   //   } catch {
//   //     setError('Failed to log out')
//   //   }
//   // }

  
//   async function handleSubmit(e) {
//     e.preventDefault() //to prevent form from refreshing

//     try {

//       setError("")
//       setLoading(true) //disabling the submit button so that the user does not create multiple accounts by mistake
//       await login(emailRef.current.value, passwordRef.current.value)
//       // localStorage.setItem("isAuth", true)
//       // setIsAuth(true)
//       history.push("/")
//     }catch {
//       setError("Failed to log in")
//     }
//     setLoading(false)
//   }

// return (
//   <div className="login-page">
//     <div className="title">
//       Log in
//     </div>

//     <div className='text-above'>
//       Nu ai un cont? 
//     {/* <button onClick={handleClick}> Sign Up</button> */}
//     <Link to ="/signup">Sign Up </Link>
//     </div>

//     {currentUser.email}
//     {error && <Alert variant="danger">{error}</Alert>}
//     <form className="form" onSubmit={handleSubmit}>
//         {/* Labels and inputs for form data */}
        // <label className="label">
        // <input name="email" type="email" ref={emailRef} required placeholder="Email"/>
        // </label>

        // <label className="label">
        // <input name="password" type="password" ref={passwordRef} required placeholder="Password"/>
        // </label>

//         <button disabled={loading} className="login-btn" type="submit" > Log in </button>
//         {/* <button className="login-btn" onClick={handleLogout} > Log out </button> */}
//       </form>
  

//   </div>
// )
  
// }
