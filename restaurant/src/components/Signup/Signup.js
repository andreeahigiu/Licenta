import React from 'react'
import { useHistory } from "react-router-dom";
import { Switch } from "@material-ui/core";
//import { makeStyles } from "@mui/styles";
import './Signup.css'


import { makeStyles } from "@material-ui/core/styles";


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
  let history = useHistory();
  // state = { clicked: false}

  // handleClick = () => {
  //     this.setState({clicked: !this.state.clicked})
  // }
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>

      <div className="grid-display">
        <div className="buyer-seller"> Register as {state.checkedA ? 'vanzator' : 'cumparator'}
        </div>

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

      <form className="form">
        {/* Labels and inputs for form data */}
        <label className="label1">
        <input className="input-signup" name="email" type="email" placeholder="Email"/>
        </label>

        <label className="label1">
        <input className="input-signup" name="password" type="password" placeholder="Password"/>
        </label>

        <button className="signup-btn" type="submit" > Sign up </button>

      </form>
      </div>

    </div>
  )
}


