import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ContentCutOutlined } from '@mui/icons-material';
import clock from '../../../utils/icons/time-svgrepo-com.svg' 
import calendar from '../../../utils/icons/date-svgrepo-com.svg' 
import bookmarkClock from '../../../utils/icons/bookmark-clock.svg' 
import table from '../../../utils/icons/table-svgrepo-com.svg' 
import people from '../../../utils/icons/people-svgrepo-com.svg' 
import menu from '../../../utils/icons/menu-svgrepo-com.svg' 
import star from '../../../utils/icons/bookmark-svgrepo-com.svg' 

import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';


import "./DashboardClient.css"


// <img  className="small-icon" src={clock} alt="clock" />

export default function MyBookings(props) {

    const [ clientDetails, setClientDetails] = useState(props.clientDetails)
    const [currentRestaurants, setCurrentRestaurants] = useState(props.allRestaurants)
    //const [currentRestaurants, setCurrentRestaurants] = useState("")
    const [trialState, setTrialState] = useState(false)

console.log("THE RESTAURANTS:", currentRestaurants)
console.log("THE RESTAURANTs 2:", currentRestaurants[0])

if(currentRestaurants && currentRestaurants.length>0){
  console.log("eok")
}else{
  console.log("nueok", currentRestaurants)
}
    // useEffect(() => {
    //   getCurrentRestaurant()
    // })

    async function getCurrentRestaurant() {
    const restaurantsArray = []
    const el = []
    let arr = [];
    clientDetails.myBookings.slice(0).reverse().map(async (item,index) => {
      
    // db.collection('ProfileRestaurant').doc(item.restaurantId)
    // .get()
    // .then( doc => {
    //   let data= doc.data()
    //   el.push(data)
    //   setCurrentRestaurants(el)
    //   })

    db.collection('ProfileRestaurant').doc(item.restaurantId).onSnapshot((doc) => {
      arr.push(doc.data())

    })
    setCurrentRestaurants(arr)
    })

    // setCurrentRestaurants(el)

    }

      //console.log("-----stare cu restaurante", currentRestaurants)

    
    function displayBookings(){
      
//clientDetails.myBookings.slice(0).reverse().map((item,index) =>
        if(currentRestaurants != undefined && clientDetails != undefined && clientDetails.myBookings.length > 1){
          
           return clientDetails.myBookings.slice(0).reverse().map((item,index) => { 
                return(
                    <Card sx={{ height: "30vh" , width: "60vw", marginBottom: "5vh", marginLeft:"1rem", marginRight:"1rem",  boxShadow: "1px 1px 8px #939393"}} className="card-container-booking">
                    <CardContent>

                      <div className="profile-booking-container">
                        <div className="profile-left-details">
                          <div className="name-loc">
                          <div className="restaurant-title">
                            {/* {console.log("curent restaurant", currentRestaurants[index])} */}
                            {item.restaurantName !=undefined ? item.restaurantName : "Nume Restaurant"}
                          </div>
                          <div className="restaurant-location">
                            {/* {console.log("......:", currentRestaurants[index])} */}
                            {item.restaurantLocation !=undefined ? item.restaurantLocation : "Locatie Restaurant"}
                          </div>
                          </div>
                          <div className="date-time-details">
                            <div className="icon-detail-booking">
                              <img  className="small-icon" src={calendar} alt="calendar" />
                              <p>{item.date.toDate().toLocaleDateString()}</p>
                            </div>
                            <div className="icon-detail-booking">
                              <img  className="small-icon" src={clock} alt="clock" />
                              <p>{ item.date.toDate().getHours() + ':' + (item.date.toDate().getMinutes()<10?'0':'') + item.date.toDate().getMinutes() }</p>
                            </div>
                          </div>
                        </div>

                        <div className="profile-right-details">
                          <div className="icon-detail-booking">
                            <img  className="small-icon" src={bookmarkClock} alt="bookmarkClock" />

                              <p className="bookmarkClock">Rezervat pentru</p>
                              <p className="bookmarkClock-val">{ item.bookedFor + " " + "ore" } </p>

                          </div>

                          <div className="icon-detail-booking">
                            <img  className="small-icon" src={table} alt="table" />

                              <p className="table">Numar masa rezervata</p>
                              <p className="table-val">{ item.tableNr} </p>
                           
                          </div>

                          <div className="icon-detail-booking">
                            <img  className="small-icon" src={menu} alt="menu" />

                              <p className="id-booking">Id rezervare: </p>
                              <p className="id-booking-val">{ item.bookingId  }</p>

                          </div>

                          <div className="icon-detail-booking">
                            <img  className="small-icon" src={people} alt="people" />
                         
                              <p className="people">Numar persoane: </p>
                              <p className="people-val">{ item.seatsNr && item.seatsNr }</p>
                        
                          </div>
                        </div>
                      </div>
                      {/* <Typography gutterBottom variant="h5" component="div">
                      Rezervare din data: {item.date.toDate().toLocaleDateString()}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Ora: { item.date.toDate().getHours() + ':' + (item.date.toDate().getMinutes()<10?'0':'') + item.date.toDate().getMinutes() }
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Rezervata pentru: { item.bookedFor + " " + "ore" } 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Nr. masa rezervata: { item.tableNr} 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Id rezervare: { item.bookingId  } 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Id masa rezervata: { item.tableId  } 
                      </Typography> */}

                    </CardContent>
                    {/* <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions> */}
                  </Card>
              
                )
            })}
            else{
              return(
                <Card sx={{ height: "23vh" , width: "40vw", marginBottom: "5vh"}}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      Nu aveti nicio rezervare
                      </Typography>

                    </CardContent>
                    {/* <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions> */}
                  </Card>
              )
            }
          }
    


  return (
      <div className="mybookings-container"> 

    {currentRestaurants == undefined ? setTrialState(true) : ""}
    {displayBookings()}
   
    </div>
  );
}
