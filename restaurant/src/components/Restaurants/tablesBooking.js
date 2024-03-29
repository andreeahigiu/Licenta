import React, { useEffect, useState } from 'react'
import './booking.css'
import { useDispatch } from 'react-redux';
import { bookTable } from '../../store/actions/bookTableAction';
import { useLocation } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import clock from '../../utils/icons/time-svgrepo-com.svg' 
import calendar from '../../utils/icons/date-svgrepo-com.svg' 
import bookmarkClock from '../../utils/icons/bookmark-clock.svg' 
import table from '../../utils/icons/table-svgrepo-com.svg' 
import people from '../../utils/icons/people-svgrepo-com.svg' 
import menu from '../../utils/icons/menu-svgrepo-com.svg' 

const btnStyleBefore = {
    borderRadius: "4px",
    outline: "none",
    border:"none",
    cursor:"pointer",
    color: "#fff",
    backgroundColor: "rgb(184, 133, 76)",
    height: "50px",
    width: "25vw",
    alignSelf:"center",
  };
  
  const btnStyleAfter = {
    borderRadius: "4px",
    outline:"none",
    border:"none",
    cursor:"pointer",
    color: "#fff",
    backgroundColor: "rgb(194, 192, 189)",
    height: "50px",
    width: "25vw",
    alignSelf:"center",
  };

export default function TablesBooking(props) {

  const { id } = useParams();
    const location = useLocation()
    const [tables, setTables] = useState("")
    const [ styles, setStyles] = useState("")
    const [tableDatePair, setTableDatePair] = useState()
    const [booking, setBooking] = useState()
    const [confirmMsg, setConfirmMsg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sceneOutline, setSceneOutline] = useState(location.state.sceneOutline)
    let unavailableArr = []
    let clickedTables = []
    const history = useHistory()
    var isMobile;


    let clickedForolor = false;
    const dispatch = useDispatch();

    useEffect(() => {
        setTables(location.state.tables)
        setStyles(location.state.style)
        setBooking(location.state.booking)
        setTableDatePair(location.state.tableDatePair)
        setSceneOutline(location.state.sceneOutline)
        isMobile = location.state.isMobile
    }, [])



    function makeReservation(e){
        e.preventDefault();
        setLoading(true);
    
        dispatch(bookTable(booking)) 
        console.log("dispatched")
  
        setTimeout(() => {
          setLoading(false)
          setConfirmMsg(true)
        }, 1000)

        setTimeout(() => {
          history.push(`/restaurante/${id}/rezervare/masa/confirmare`, {booking:booking})

        }, 2000)

      }

      function displaySeats(index){
        let tablesCpy = structuredClone(tables)
        if(tablesCpy[index].places === 2){
          return <React.Fragment>
            <div id="point2-1"/>
            <div id="point2-2"/>
          </React.Fragment>
        }
    
        if(tablesCpy[index].places === 4){
          return   <React.Fragment>
          <div id="point4-1"/>
          <div id="point4-2"/>
          <div id="point4-3"/>
          <div id="point4-4"/>
        </React.Fragment>
        }
    
        if(tablesCpy[index].places === 6){
          return   <React.Fragment>
          <div id="point6-1"/>
          <div id="point6-2"/>
          <div id="point6-3"/>
          <div id="point6-4"/>
          <div id="point6-5"/>
          <div id="point6-6"/>
        </React.Fragment>
        }
    
        if(tablesCpy[index].places === 8){
          return <React.Fragment>
          <div id="point8-1"/>
          <div id="point8-2"/>
          <div id="point8-3"/>
          <div id="point8-4"/>
          <div id="point8-5"/>
          <div id="point8-6"/>
          <div id="point8-7"/>
          <div id="point8-8"/>
        </React.Fragment>
        }
      }
      

    function selectTable(selectedTable, index){
        clickedForolor = !clickedForolor;

        console.log("Masa aleasa:", selectedTable)
        booking.tableId= selectedTable.id;
        booking.tableNr = index
        setBooking(booking);

        const hasBeenClickedBefore = (currentValue) => document.getElementById(currentValue).style.background="linear-gradient(135deg,#f7b55f,#cc7504)";
        clickedTables.every(hasBeenClickedBefore)

        var col=document.getElementById(index);
        col.style.background="linear-gradient(135deg,rgb(249, 211, 163),rgb(252, 193, 116))";

        clickedTables.push(index)
      
      }

      function checkAllTables(){

        var seatsNrToCheck;
        tables.map((item,index) => { 
          if(checkAvailabilityForHours(item)){
            unavailableArr[index] = true
          }
        }
        )

        
        if (booking.seatsNr === 2){
          seatsNrToCheck = 2;
        }else
        if(booking.seatsNr === 3){
          seatsNrToCheck = 4;
        }else
        if (booking.seatsNr === 4){
          seatsNrToCheck = 4;
        }else
        if(booking.seatsNr === 5){
          seatsNrToCheck = 6;
        }else
        if (booking.seatsNr === 6){
          seatsNrToCheck = 6;
        }else
        if(booking.seatsNr === 7){
          seatsNrToCheck = 8;
        }else
        if(booking.seatsNr === 8){
          seatsNrToCheck = 8;
        }

        //making all the tables with fewer seats than desired, unavailable
        tables.map((item,index) => { 
          if(booking.seatsNr > item.places){
            unavailableArr[index] = true
          }
        })

        while(seatsNrToCheck <= 8){
          console.log("SeatsNrToCheck:", seatsNrToCheck)

          for( var index = 0; index< tables.length; index++) { 
            var item = tables[index]
            console.log("item in for:", item)

            if(item.places === seatsNrToCheck){
              if(unavailableArr[index] !== true){

                tables.map((item,index) => { 
                  if(item.places !== seatsNrToCheck){
                    unavailableArr[index] = true
                  }
                })

                break;
              }
            }
          }

          seatsNrToCheck+=2
        }
      }

    function checkAvailabilityForHours(item){

      if(tableDatePair !== undefined && tableDatePair[booking.date] !== undefined){
        if(tableDatePair[booking.date].includes(item.id)){
          return true
        }
      }


      let dateIterator=structuredClone( booking.date);
      const bookingEnd=booking.endOfBooking


      while(dateIterator.getTime() < bookingEnd.getTime()){

        if(tableDatePair !== undefined && tableDatePair[dateIterator] !== undefined){
          if(tableDatePair[dateIterator].includes(item.id)){
            return true
          }
        }

      dateIterator.setTime(dateIterator.getTime() + 0.5 * 60 * 60 * 1000)

      }

      return false
    }

  
    function makeBookingMobile(){
      if(tables){
        checkAllTables();
        if(unavailableArr.every( (val) => val === true ) ){
          return(<div className="no-table-available"> <p>Nu există nicio masă disponibilă pentru selecția dumneavoastră! </p> </div>)
        }
        for( var index=0; index<tables.length; index++){
          if(unavailableArr[index]!==true){
            booking.tableId= tables[index].id;
            booking.tableNr = index
            dispatch(bookTable(booking)) 
            return(
              <div>
                <div className="booking-card-message">Ati făcut o rezervare pentru:</div>
              <Card sx={{ height: "30vh" , width: "60vw", marginBottom: "5vh", marginLeft:"1rem", marginRight:"1rem",  boxShadow: "1px 1px 8px #939393"}} className="card-container-booking">
                   
                    <CardContent>

                      <div className="profile-booking-container">
                        <div className="profile-left-details">
                          <div className="name-loc">
                          <div className="restaurant-title">
                            {booking.restaurantName !==undefined ? booking.restaurantName : "Nume Restaurant"}
                          </div>
                          <div className="restaurant-location">
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

            )
          }
        }
      }
    }

    function tableList(){
        console.log("THE PAIRS:", tableDatePair)
        let styleArr = styles
        if(tables){
          checkAllTables();
          return tables.map((item,index) => {

   

            return(
                unavailableArr[index] ? 

                <div key={index} id={index} className="table-btn-booking-unavailable" style={styleArr[index]}> 
                <p className="table-nr"> {index} </p>
                {displaySeats(index)}
                </div>
                :
                <div key={index} id={index} className="table-btn-booking" style={styleArr[index]} onClick={ () => selectTable(item, index) }> 
                <p className="table-nr"> {index} </p> 
                {displaySeats(index)}
                </div>
            )
          })
        }
    
      }



console.log("isMobile?", location.state.isMobile)
  return (

    location.state.isMobile ? 
    <div className="booking-container-mobile">
      <div>
       {makeBookingMobile()}
       </div>
    
    </div>
    :
    <div>
     <div className="booking-container">
       {console.log("data", location.state.booking.date) }
        <p className="restaurant-scene-booking"> Rezerva o masa pentru: { (location.state.booking.date.toLocaleDateString() + " - " + location.state.booking.date.getHours() + ':' + (location.state.booking.date.getMinutes()<10?'0':'') + location.state.booking.date.getMinutes()) } </p>
        <div id="sceneBooking" className='scene-booking' >

        <div className="scene-top">

<div className="input-style" > {sceneOutline[0]} </div>
<div className="input-style" > {sceneOutline[1]} </div>
<div className="input-style" > {sceneOutline[2]} </div>
<div className="input-style" > {sceneOutline[3]} </div>
<div className="input-style" > {sceneOutline[4]} </div>

</div>

<div className="scene-left-right"> 
<div className="scene-left-booking">
  <div className="input-style-vertical">{sceneOutline[5]}</div>
  <div className="input-style-vertical">{sceneOutline[6]}</div>
  <div className="input-style-vertical">{sceneOutline[7]}</div>
  <div className="input-style-vertical">{sceneOutline[8]}</div>



</div>

<div className="scene-right-booking">
<div className="input-style-vertical">{sceneOutline[9]}</div>
  <div className="input-style-vertical">{sceneOutline[10]}</div>
  <div className="input-style-vertical">{sceneOutline[11]}</div>
  <div className="input-style-vertical">{sceneOutline[12]}</div>

</div>
</div>

<div className="scene-bottom">
<div className="input-style" > {sceneOutline[13]} </div>
<div className="input-style" > {sceneOutline[14]} </div>
<div className="input-style" > {sceneOutline[15]} </div>
<div className="input-style" > {sceneOutline[16]} </div>
<div className="input-style" > {sceneOutline[17]} </div>
</div>


        {tableList()}
        </div>
      </div>

    {confirmMsg ? 
    <div className="confirm-msg-container"> 
      <div className="confirm-msg"> Rezervare efectuata cu succes! </div>
    </div>
    :
    <div className="book-btn-container">
            <button id="bookingBtn" style={loading ? btnStyleAfter : btnStyleBefore} onClick={e => makeReservation(e)}> Rezerva acum! </button>
    </div>
 } 
    </div>

  )

}
