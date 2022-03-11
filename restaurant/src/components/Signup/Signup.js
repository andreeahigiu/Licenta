import React from 'react'
import { useHistory } from 'react-router-dom';


export default function Signup() {
    const history = useHistory();
    const handleClick = () => history.push('/login');
  return (
    <div>
      sign up!
      no account?
      <button onClick={handleClick} > Login </button>
    </div>
  )
}

// const picture = new URL("./utils/background.jpg", import.meta.url)

