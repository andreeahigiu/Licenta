import React, { useEffect, useState } from 'react'
import './booking.css'
import { useSelector, useDispatch } from 'react-redux';
import { bookTable } from '../../store/actions/bookTableAction';
import { useLocation } from 'react-router-dom';
import { Circle } from "react-awesome-shapes";

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

    //console.log("LOCATION", location.state)

    let clickedForolor = false;
    const dispatch = useDispatch();

    useEffect(() => {
        setTables(location.state.tables)
        setStyles(location.state.style)
        setBooking(location.state.booking)
        setTableDatePair(location.state.tableDatePair)
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

    function checkAvailabilityForHours(item){
      console.log("IN FUNCTION")
      console.log("item.id:       ", item.id)

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

      return false
    }

    // while( convertedEndOfBooking != '' && convertedDate.getTime() < convertedEndOfBooking.getTime()){
    //   tableDate[convertedDate].push(data.tableId)
    //   convertedDate.setTime(convertedDate.getTime() + 0.5 * 60 * 60 * 1000)
    //   tableDate[convertedDate] = []
    //   console.log("Transformarea lui convertedTime", convertedDate)
    // }

  //   ( tableDatePair[booking.date] !== undefined ? 
  //     (tableDatePair[booking.date].includes(item.id) 
  //     ? 
  //     unavailableArr[index] = true
  //     : 
  //     console.log("Does NOT include the id", item.id) 
  //     ) 
  // : console.log("e undefined") ) 

  // (checkAvailabilityForHours(item) 
  // ? 
  // unavailableArr[index] = true
  // : 
  // console.log("Does NOT include the id", item.id) 
  // ) 

  {console.log("The booking details:",booking)}
  
    function tableList(){
        console.log("THE PAIRS:", tableDatePair)
        let styleArr = styles
        if(tables){
          return tables.map((item,index) => {
  (checkAvailabilityForHours(item) 
  ? 
  unavailableArr[index] = true
  : 
  console.log("Does NOT include the id", item.id) 
  ) 
   

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



  return (
    <div>
     <div className="booking-container">
       {console.log("data", location.state.booking.date) }
        <p className="restaurant-scene-booking"> Rezerva o masa pentru: { (location.state.booking.date.toLocaleDateString() + " - " + location.state.booking.date.getHours() + ':' + (location.state.booking.date.getMinutes()<10?'0':'') + location.state.booking.date.getMinutes()) } </p>
        <div id="sceneBooking" className='scene-booking' >

        {/* { ( tableDatePair[booking.date] !== undefined ? 
                (tableDatePair[booking.date].includes(item.id) 
                ? 
                console.log("includes the id", item.id) 
                : 
                console.log("Does NOT include the id", item.id) 
                ) 
            : console.log("e undefined") ) }  */}


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
