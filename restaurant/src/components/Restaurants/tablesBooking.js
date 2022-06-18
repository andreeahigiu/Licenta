import React, { useEffect, useState } from 'react'
import './booking.css'
import { useSelector, useDispatch } from 'react-redux';
import { bookTable } from '../../store/actions/bookTableAction';
import { useLocation } from 'react-router-dom';
import { Circle } from "react-awesome-shapes";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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

    const location = useLocation()
    const [tables, setTables] = useState("")
    const [ styles, setStyles] = useState("")
    const [tableDatePair, setTableDatePair] = useState()
    const [booking, setBooking] = useState()
    const [confirmMsg, setConfirmMsg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [makeUnavailable, setMakeUnavailable] = useState(false)
    let unavailableArr = []
    let clickedTables = []
    const history = useHistory()
    var isMobile;

    //console.log("LOCATION", location.state)

    let clickedForolor = false;
    const dispatch = useDispatch();

    useEffect(() => {
        setTables(location.state.tables)
        setStyles(location.state.style)
        setBooking(location.state.booking)
        setTableDatePair(location.state.tableDatePair)
        isMobile = location.state.isMobile
    }, [])



    function makeReservation(e){
        e.preventDefault();
        setLoading(true);
  
        // booking.bookingId=uuid();
        // booking.userId=currentUser.uid;
        // booking.date= bookedDate;
        // booking.tableId= bookedTable;
        // setBooking(booking);
  
    
        dispatch(bookTable(booking)) 
        console.log("dispatched")
  
        setTimeout(() => {
          setLoading(false)
          setConfirmMsg(true)
        }, 1000)

        setTimeout(() => {
          history.push('/dashboardClient')
        }, 2000)


  
        // document.getElementById("bookingBtn").innerHTML = "Rezervare efectuata cu succes!";
        //setLoading(false)
      }

      function displaySeats(index){
        let tablesCpy = structuredClone(tables)
        if(tablesCpy[index].places == 2){
          return <React.Fragment>
            <div id="point2-1"/>
            <div id="point2-2"/>
          </React.Fragment>
        }
    
        if(tablesCpy[index].places == 4){
          return   <React.Fragment>
          <div id="point4-1"/>
          <div id="point4-2"/>
          <div id="point4-3"/>
          <div id="point4-4"/>
        </React.Fragment>
        }
    
        if(tablesCpy[index].places == 6){
          return   <React.Fragment>
          <div id="point6-1"/>
          <div id="point6-2"/>
          <div id="point6-3"/>
          <div id="point6-4"/>
          <div id="point6-5"/>
          <div id="point6-6"/>
        </React.Fragment>
        }
    
        if(tablesCpy[index].places == 8){
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
      

      // const hasBeenClickedBefore = (currentValue) => document.getElementById(currentValue).style.background="linear-gradient(135deg,#f7b55f,#cc7504)";
      // clickedTables.every(hasBeenClickedBefore)

      // var col=document.getElementById(index);
      // col.style.background="linear-gradient(135deg,rgb(249, 211, 163),rgb(252, 193, 116))";


    function selectTable(selectedTable, index){
        clickedForolor = !clickedForolor;
        //clickedTables.push(index)

        console.log("Masa aleasa:", selectedTable)
        // setBookedTable(selectedTable.id)
        booking.tableId= selectedTable.id;
        booking.tableNr = index
        setBooking(booking);

        const hasBeenClickedBefore = (currentValue) => document.getElementById(currentValue).style.background="linear-gradient(135deg,#f7b55f,#cc7504)";
        clickedTables.every(hasBeenClickedBefore)

        var col=document.getElementById(index);
        col.style.background="linear-gradient(135deg,rgb(249, 211, 163),rgb(252, 193, 116))";
        // if(clickedForolor == true){
        //   col.style.backgroundColor="rgb(242, 197, 137)";
        // }else{
        //   col.style.backgroundColor="rgb(204, 117, 4)";
        // }

        clickedTables.push(index)
      
      }

      function checkAllTables(){
        // if(booking.seatsNr * 2 < item.places){
        //   return true
        // }
  
        // if(booking.seatsNr > item.places){
        //   return true
        // }
        var seatsNrToCheck = undefined
        tables.map((item,index) => { 
          if(checkAvailabilityForHours(item)){
            unavailableArr[index] = true
          }
        }
        )

        
        if (booking.seatsNr == 2){
          seatsNrToCheck = 2;
        }else
        if(booking.seatsNr == 3){
          seatsNrToCheck = 4;
        }else
        if (booking.seatsNr == 4){
          seatsNrToCheck = 4;
        }else
        if(booking.seatsNr == 5){
          seatsNrToCheck = 6;
        }else
        if (booking.seatsNr == 6){
          seatsNrToCheck = 6;
        }else
        if(booking.seatsNr == 7){
          seatsNrToCheck = 8;
        }else
        if(booking.seatsNr == 8){
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

            if(item.places == seatsNrToCheck){
              if(unavailableArr[index] != true){

                tables.map((item,index) => { 
                  if(item.places != seatsNrToCheck){
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
      // console.log("dateIterator:", booking.date)
      // console.log("eng of booking:", booking.endOfBooking)

      while(dateIterator.getTime() < bookingEnd.getTime()){

        if(tableDatePair !== undefined && tableDatePair[dateIterator] !== undefined){
          if(tableDatePair[dateIterator].includes(item.id)){
            console.log(" INCLUDED ")
            return true
          }
        }

      dateIterator.setTime(dateIterator.getTime() + 0.5 * 60 * 60 * 1000)
      //console.log(".....................The date that is being checked", dateIterator)
      // if(tableDatePair[dateIterator] == undefined){
      //   tableDatePair[dateIterator] = []
      // }
      }

      // checking the seats nr.
      // if(booking.seatsNr * 2 < item.places){
      //   return true
      // }

      // if(booking.seatsNr > item.places){
      //   return true
      // }

      return false
    }

  {console.log("The booking details:",booking)}
  
    function makeBookingMobile(){
      if(tables){
        checkAllTables();
        for( var index=0; index<tables.length; index++){
          if(unavailableArr[index]!=true){
            booking.tableId= tables[index].id;
            booking.tableNr = index
            dispatch(bookTable(booking)) 
            console.log("dispatched")
            return(
              <div>
                <div>Ati facut o rezervare pentru: </div>
                <div>Data:{booking.date.toLocaleDateString()} </div>
                <div>Ora: {booking.date.getHours() + ':' + (booking.date.getMinutes()<10?'0':'') + booking.date.getMinutes()}</div>
                <div>Nr. pers: {booking.seatsNr}</div>
                <div>Interval: {booking.bookedFor}</div>
              </div>
            )
          }
        }
      }
    }

// { (location.state.booking.date.toLocaleDateString() + " - " + location.state.booking.date.getHours() + ':' + (location.state.booking.date.getMinutes()<10?'0':'') + location.state.booking.date.getMinutes()) }
    function tableList(){
        console.log("THE PAIRS:", tableDatePair)
        let styleArr = styles
        if(tables){
          checkAllTables();
          return tables.map((item,index) => {
  // (checkAvailabilityForHours(item) 
  // ? 
  // unavailableArr[index] = true
  // : 
  // console.log("Does NOT include the id", item.id) 
  // ) 
   

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


      var radius = 150;
var degrees = 0;

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

var loop = function(){
  if(degrees === 360) {
    degrees = 0;    
  } else {
    degrees += 1;
  }
  var inverse = Math.radians(degrees + 90) - Math.radians(90);
 
  var x = (Math.sin(inverse) * radius) - 1;
  var y = (Math.cos(inverse) * radius) + 1;

  document.getElementById("degrees").innerHTML = degrees;
  document.getElementById("point").style.marginLeft = x + 'px';
  document.getElementById("point").style.marginTop = -y + 'px';
  window.requestAnimationFrame(loop);  
}



console.log("isMobile?", location.state.isMobile)
  return (

    location.state.isMobile ? 
    <div className="booking-container-mobile">
      <div>
       Mobile
       {makeBookingMobile()}
       </div>
    
    </div>
    :
    <div>
     <div className="booking-container">
       {console.log("data", location.state.booking.date) }
        <p className="restaurant-scene-booking"> Rezerva o masa pentru: { (location.state.booking.date.toLocaleDateString() + " - " + location.state.booking.date.getHours() + ':' + (location.state.booking.date.getMinutes()<10?'0':'') + location.state.booking.date.getMinutes()) } </p>
        <div id="sceneBooking" className='scene-booking' >

        {tableList()}
        </div>
      </div>

    {confirmMsg ? 
    <div className="confirm-msg-container"> 
      <div> V </div>
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
