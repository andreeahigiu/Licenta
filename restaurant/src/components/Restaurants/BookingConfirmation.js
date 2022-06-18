import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import clock from '../../utils/icons/time-svgrepo-com.svg' 
import calendar from '../../utils/icons/date-svgrepo-com.svg' 
import bookmarkClock from '../../utils/icons/bookmark-clock.svg' 
import table from '../../utils/icons/table-svgrepo-com.svg' 
import people from '../../utils/icons/people-svgrepo-com.svg' 
import menu from '../../utils/icons/menu-svgrepo-com.svg'  
import { useLocation } from 'react-router-dom';
import "./booking.css"

export default function BookingConfirmation(props) {
    const location = useLocation()
    const [booking, setBooking] = useState(location.state.booking)

  return (
    <div className="final-message" >
        <div>
    <div className="booking-card-message">Ati făcut o rezervare pentru:</div>
  <Card sx={{ height: "30vh" , width: "60vw", marginBottom: "5vh", marginLeft:"1rem", marginRight:"1rem",  boxShadow: "1px 1px 8px #939393"}} className="card-container-booking">
       
        <CardContent>

          <div className="profile-booking-container">
            <div className="profile-left-details">
              <div className="name-loc">
              <div className="restaurant-title">
                {/* {console.log("curent restaurant", currentRestaurants[index])} */}
                {booking.restaurantName !==undefined ? booking.restaurantName : "Nume Restaurant"}
              </div>
              <div className="restaurant-location">
                {/* {console.log("......:", currentRestaurants[index])} */}
                {booking.restaurantLocation !==undefined ? booking.restaurantLocation : "Locatie Restaurant"}
              </div>
              </div>
              <div className="date-time-details">
                <div className="icon-detail-booking">
                  <img  className="small-icon" src={calendar} alt="calendar" />
                  <p>{booking.date.toLocaleDateString()}</p>
                </div>
                <div className="icon-detail-booking">
                  <img  className="small-icon" src={clock} alt="clock" />
                  <p>{ booking.date.getHours() + ':' + (booking.date.getMinutes()<10?'0':'') + booking.date.getMinutes() }</p>
                </div>
              </div>
            </div>

            <div className="profile-right-details">
              <div className="icon-detail-booking">
                <img  className="small-icon" src={bookmarkClock} alt="bookmarkClock" />

                  <p className="bookmarkClock">Rezervat pentru</p>
                  <p className="bookmarkClock-val">{ booking.bookedFor + " " + "ore" } </p>

              </div>

              <div className="icon-detail-booking">
                <img  className="small-icon" src={table} alt="table" />

                  <p className="table">Numar masa rezervata</p>
                  <p className="table-val">{ booking.tableNr} </p>
               
              </div>

              <div className="icon-detail-booking">
                <img  className="small-icon" src={menu} alt="menu" />

                  <p className="id-booking">Id rezervare: </p>
                  <p className="id-booking-val">{ booking.bookingId  }</p>

              </div>

              <div className="icon-detail-booking">
                <img  className="small-icon" src={people} alt="people" />
             
                  <p className="people">Numar persoane: </p>
                  <p className="people-val">{ booking.seatsNr && booking.seatsNr }</p>
            
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      </div>
  )
}
