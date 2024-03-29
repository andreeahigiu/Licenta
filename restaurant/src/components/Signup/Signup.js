import React, { useRef, useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import { Switch } from "@material-ui/core"
import './Signup.css'
import { makeStyles } from "@material-ui/core/styles"
import { useAuth } from '../../contexts/AuthContext'
import { Alert } from 'react-bootstrap';
import { db } from "../../firebase"
import { setDoc, doc } from "firebase/firestore"


const useStyles = makeStyles({
  root: {
    width: "140px",
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
    transform: "translateX(32px) !important"

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
      content: "'Client'",
      left: "10px"
    },
    "&:before": {
      content: "'Restaurant'",
      right: "8px"
    }
  },
  checked: {
    color: "#000000 !important",
    transform: "translateX(-62px) !important"
  }
});

export default function Signup() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: false
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      const cred = await signup(emailRef.current.value, passwordRef.current.value)

      if (cred) {
        console.log({ cred });
        const userId = cred.user.uid;
    
        var docName = " "
        state.checkedA ? docName="ProfileRestaurant" : docName="ProfileCustomer"
        console.log("checkedA: ", state.checkedA)
        const docRef = doc(db, docName, userId )
        const newEl = {name: "", email:"", phone: null}
        await setDoc(docRef, newEl)
        }
      history.push("/")
      window.location.reload(false);
    } catch {
      setError("Nu s-a putut crea contul. Parola trebuie să aibă minimum 6 caractere!")
    }
    setLoading(false)

  }


  return (
    <>
      <div className="signup-layout">
         <div className="grid-display">
         <p className="buyer-seller"> Inregistrare  
        <span className="buyer-seller-word"> {state.checkedA ? ' restaurant' : ' client'} </span>
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
}


