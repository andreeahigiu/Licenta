import React, { useRef, useState, useCallback } from 'react'
import { Link, useHistory } from "react-router-dom"
import { Switch } from "@material-ui/core"
import './Signup.css'
import { makeStyles } from "@material-ui/core/styles"
import { useAuth } from '../../contexts/AuthContext'
import { Form, Button, Card, Alert } from 'react-bootstrap';


const useStyles = makeStyles({
  root: {
    width: "125px",
    height: "32px",
    padding: "0",
    alignItems: "center",
    justifyContent: "center"
  },
  switchBase: {
    color: "#000000",
    padding: "1px",
    right: "1px",
    "&$checked": {
      "& + $track": {
       backgroundColor: "#000000"
      }
    }
  },
  thumb: {
    color: "white",
    width: "65px",
    height: "25px",
    margin: "2px",
    borderRadius: "4px",
    transform: "translateX(27px) !important"

  },
  track: {
    borderRadius: "4px",
    backgroundColor: "#000000",
    opacity: "1 !important",
    "&:after, &:before": {
      color: "white",
      fontSize: "11px",
      position: "absolute",
      top: "9px"
    },
    "&:after": {
      content: "'Cumpara'",
      left: "5px"
    },
    "&:before": {
      content: "'Vinde'",
      right: "7px"
    }
  },
  checked: {
    color: "#000000 !important",
    transform: "translateX(-52px) !important"
  }
});

export default function Signup() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  const [state, setState] = React.useState({
    checkedA: false
  });

    const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <div className="signup-layout">
         <div className="grid-display">
         <p className="buyer-seller"> Inregistrare  
        <span className="buyer-seller-word"> {state.checkedA ? ' vanzator' : ' cumparator'} </span>
         </p>

         <div className="switch-btn">
       <Switch
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked
        }}
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
        </div>

        </div>
         

          {error && <Alert variant="danger">{error}</Alert>}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-fields">
            
            <label className="label1">
            <input className="input-signup" name="email" type="email" ref={emailRef} placeholder="Email"/>
            </label>

            <label className="label1">
            <input className="input-signup" name="password" type="password" ref={passwordRef} placeholder="Parola"/>
            </label>

            <label className="label1">
            <input className="input-signup" name="password" type="password" ref={passwordConfirmRef} placeholder="Confirma Parola"/>
            </label>

            <button className="signup-btn" disabled={loading}  type="submit">
              Sign Up
            </button>

            </div>
          </form>
          
          <div className="already-an-account">
          Ai deja un cont? 
          <p>
          <Link className="link-button" to="/login">Log In</Link>
          </p>
          </div>
      </div>

    </>
  )

  // let history = useHistory();

  // const emailRef = useRef()
  // const passwordRef = useRef()
  // const passwordConfirmRef = useRef()
  // const { signup, currentUser } =  useAuth()
  // const [error, setError] = useState('')
  // const [loading, setLoading] = useState(false)
  // const classes = useStyles();

  // const [state, setState] = React.useState({
  //   checkedA: false
  // });

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  
  // async function handleSubmit(e) {
  //   e.preventDefault() //to prevent form from refreshing

  //   if (passwordRef.current.value !== passwordConfirmRef.current.value){
  //     return setError("The passwords do not match!")
  //   }

  //   try {
  //     setError("")
  //     setLoading(true) //disabling the submit button so that the user does not create multiple accounts by mistake
  //     await signup(emailRef.current.value, passwordRef.current.value)
  //     history.push("/")
  //   }catch {
  //     setError("Could not create an account")
  //   }

  //   setLoading(false)
  // }

  // return (
  //   <div>
  //     {/* <button onClick={() => history.goBack()}>Back</button> */}

  //     {currentUser.email}
  //     {error && <Alert variant="danger">{error}</Alert>}
  //     <form className="form" onSubmit={handleSubmit}>

  //     <div className="grid-display">
  //       <div className="buyer-seller"> Register as {state.checkedA ? 'vanzator' : 'cumparator'}
  //       </div>

  //   <div className="switch-btn">
  //     <Switch
  //       classes={{
  //         root: classes.root,
  //         switchBase: classes.switchBase,
  //         thumb: classes.thumb,
  //         track: classes.track,
  //         checked: classes.checked
  //       }}
  //       checked={state.checkedA}
  //       onChange={handleChange}
  //       name="checkedA"
  //       inputProps={{ "aria-label": "secondary checkbox" }}
  //     />
  //   </div>

  //     {/* <form className="form"> */}
  //       {/* Labels and inputs for form data */}
        // <label className="label1">
        // <input className="input-signup" name="email" type="email" ref={emailRef} placeholder="Email"/>
        // </label>

        // <label className="label1">
        // <input className="input-signup" name="password" type="password" ref={passwordRef} placeholder="Password"/>
        // </label>

        // <label className="label1">
        // <input className="input-signup" name="password" type="password" ref={passwordConfirmRef} placeholder="Confirm Password"/>
        // </label>

  //       <button disabled={loading} className="signup-btn" type="submit" > Sign up </button>


  //     </div>
  //     </form>

  //   </div>
  //)
}


