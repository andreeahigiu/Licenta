import React, { useEffect, useState } from 'react'
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import './BookingsCalendar.css'

export default function BookingsCalendarCard(props) {
  const[thisBooking] = useState(props.booking)
  const [clientDetails, setClientDetails] = useState("")
  const [tableDetails, setTableDetails] = useState("")
    const bookingDate = new Date(props.booking.date.seconds*1000)

    useEffect(async ()=>{

      await db.collection('ProfileCustomer').doc(props.booking.userId).get()
      .then(snapshot => {setClientDetails(snapshot.data())
      })

      await db.collection('AllRestaurants').doc(props.booking.restaurantId).collection('Tables').doc(props.booking.tableId).get()
      .then(snapshot => {setTableDetails(snapshot.data())
      })

      

    })



  

  return (
    <div className="booking-calendar-container">
      {/* {console.log("props.booking:",bookingDate)} */}
      <div className="show-time">{ ( bookingDate.getHours() + ':' + ((bookingDate.getMinutes()<10?'0':'') + (bookingDate.getMinutes())) ) }</div>
      <div className="vertical-line"/>

<div className="all-details-wrap">
      <div className="details-wrap-1">
          <h3 className="entity-name">{clientDetails.name + " " + clientDetails.surname}</h3>
          <div className="client-details">
              <div>{clientDetails.phone}</div>
              <div>{clientDetails.email}</div>
          </div>
      </div>

      <div className="vertical-line"/>

      <div className="details-wrap-2">
          <h3 className="entity-name">Masa {thisBooking.tableNr}</h3>
          <div className="table-details">
            <div className="info-container">
              <div className="booked-table-detail">Locuri: </div>
              <div>  {thisBooking.seatsNr ? thisBooking.seatsNr : "nespecificat"}</div>
            </div>

            <div className="info-container">
              <div className="booked-table-detail">Rezervata pentru: </div>
              <div>  {thisBooking.bookedFor + " " + "ore"}</div>
            </div>
              <div> 
                  <div className="booked-table-detail">Specificatii: </div> 
                  <p className="table-specifications">{tableDetails.specifications ? tableDetails.specifications : "nespecificat"}</p>
                  
              </div>
          </div>
      </div>
      </div>

    </div>
  )
}
