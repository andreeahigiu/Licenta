import React from 'react'
import './Home.css'
import { useHistory } from 'react-router-dom';

// const picture = new URL("./utils/background.jpg", import.meta.url)

export default function Home() {
  const history = useHistory();
  const handleClick = () => history.push('/restaurante');

  return (
    <div className="bkg_container">
      <img className="bkg" src={"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}  /> 
      <button className="btn_reservation" onClick={handleClick}>
        Rezerva acum! 
      </button>
      {/* <div className="bell"></div> */}
    </div>
  )
}

