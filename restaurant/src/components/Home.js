import React, { useState, Component, useEffect } from 'react';
import './Home.css'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// const picture = new URL("./utils/background.jpg", import.meta.url)

export default function Home() {
  const history = useHistory();
  const { currentUser } = useAuth()
  var route;
  const [userType, setUserType] = useState("");

  const handleClick = () => history.push('/restaurante');

  const handleRestaurantClick = () => history.push('/dashboardRestaurant');


  useEffect(() => {

    const checkUserType = async () => {
        if(currentUser != null){
            const customerdocRef = doc(db, "ProfileCustomer", currentUser.uid )
            const customerEl = await getDoc(customerdocRef)
    
            console.log("currentUser id:", currentUser.uid)
            const restaurantdocRef = doc(db, "ProfileRestaurant", currentUser.uid )
            const restaurantEl = await getDoc(restaurantdocRef)
    
            if(customerEl.exists()){
                setUserType("customer")
            }
            else if(restaurantEl.exists()){
                setUserType("restaurant")
            }

        }


    }

    checkUserType()
    .catch(console.error)


}, [])

  return (
    <div className="bkg_container">
      <img className="bkg" src={"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}  /> 
      {userType =="" || userType=="customer" ?
              <button className="btn_reservation" onClick={handleClick}>
              Rezerva acum! 
            </button>

            :

            <button className="btn_reservation" onClick={handleRestaurantClick}>
            Calendar Rezervări 
          </button>

      } 
      
      {/* <button className="btn_reservation" onClick={handleClick}>
        Rezerva acum! 
      </button> */}
      {/* <div className="bell"></div> */}
    </div>
  )
}


