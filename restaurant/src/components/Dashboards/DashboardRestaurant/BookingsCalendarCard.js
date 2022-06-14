import React from 'react'

export default function BookingsCalendarCard(props) {
    const bookingDate = new Date(props.booking.date.seconds*1000)
  return (
    <div className="booking-calendar-container">
      {console.log("props.booking:",bookingDate)}
      <div className="show-time">{ ( bookingDate.getHours() + ':' + ((bookingDate.getMinutes()<10?'0':'') + (bookingDate.getMinutes())) ) }</div>
      <div className="vertical-line"/>

      <div className="details-wrap-1">
          <h3 className="entity-name">John Doe</h3>
          <div className="client-details">
              <div>+70733455623</div>
              <div>email@email.com</div>
          </div>
      </div>

      <div className="vertical-line"/>

      <div className="details-wrap-2">
          <h3 className="entity-name">Masa {props.booking.bookedFor}</h3>
          <div className="table-details">
              <div> Locuri: 4</div>
              <div> Rezervata pentru: 4</div>
              <div> 
                  <h3>Specificatii: </h3> 
                  <p className="table-specifications">Este o masa foarte aproape de bar si incap chiar si 6 persoane la ea.lalahjhdguygg </p>
                  
              </div>
          </div>
      </div>

    </div>
  )
}
