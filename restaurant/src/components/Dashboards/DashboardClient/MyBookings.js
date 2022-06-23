import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import clock from '../../../utils/icons/time-svgrepo-com.svg' 
import calendar from '../../../utils/icons/date-svgrepo-com.svg' 
import bookmarkClock from '../../../utils/icons/bookmark-clock.svg' 
import table from '../../../utils/icons/table-svgrepo-com.svg' 
import people from '../../../utils/icons/people-svgrepo-com.svg' 
import menu from '../../../utils/icons/menu-svgrepo-com.svg' 
import "./DashboardClient.css"


export default function MyBookings(props) {

    const [ clientDetails, setClientDetails] = useState(props.clientDetails)
    const [currentRestaurants, setCurrentRestaurants] = useState(props.allRestaurants)


    function displayBookings(){
      console.log("client's bookings: ", clientDetails)
      
        if(currentRestaurants != undefined && clientDetails != undefined && clientDetails.myBookings && clientDetails.myBookings.length > 0){
          
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

                              <p className="table">Număr masă rezervată</p>
                              <p className="table-val">{ item.tableNr} </p>
                           
                          </div>

                          <div className="icon-detail-booking">
                            <img  className="small-icon" src={menu} alt="menu" />

                              <p className="id-booking">Id rezervare: </p>
                              <p className="id-booking-val">{ item.bookingId  }</p>

                          </div>

                          <div className="icon-detail-booking">
                            <img  className="small-icon" src={people} alt="people" />
                         
                              <p className="people">Număr persoane: </p>
                              <p className="people-val">{ item.seatsNr && item.seatsNr }</p>
                        
                          </div>
                        </div>
                      </div>

                    </CardContent>
                  </Card>
              
                )
            })}
            else{
              return(
                <Card sx={{ height: "23vh" , width: "40vw", marginBottom: "5vh"}}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      Nu aveți nicio rezervare
                      </Typography>

                    </CardContent>
                  </Card>
              )
            }
          }
    


  return (
      <div className="mybookings-container"> 


    {displayBookings()}
   
    </div>
  );
}
