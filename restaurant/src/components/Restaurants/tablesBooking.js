import React, { useEffect, useState } from 'react'
import './booking.css'
import { useSelector, useDispatch } from 'react-redux';
import { bookTable } from '../../store/actions/bookTableAction';

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

    const [tables, setTables] = useState("")
    const [ styles, setStyles] = useState("")
    const [tableDatePair, setTableDatePair] = useState()
    const [booking, setBooking] = useState()
    const [confirmMsg, setConfirmMsg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [makeUnavailable, setMakeUnavailable] = useState(false)
    let unavailableArr = []

    let clickedForolor = false;
    const dispatch = useDispatch();

    useEffect(() => {
        setTables(props.tables)
        setStyles(props.style)
        setBooking(props.booking)
        setTableDatePair(props.tableDatePair)
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
    
    function selectTable(selectedTable, index){
        clickedForolor = !clickedForolor;
        console.log("Masa aleasa:", selectedTable)
        // setBookedTable(selectedTable.id)
        booking.tableId= selectedTable.id;
        setBooking(booking);
        var col=document.getElementById(index);
        if(clickedForolor == true){
          col.style.backgroundColor="rgb(242, 197, 137)";
        }else{
          col.style.backgroundColor="rgb(204, 117, 4)";
        }
      
      }


    function tableList(){
        console.log("PROPS:", props)
        let styleArr = styles
        if(tables){
          return tables.map((item,index) => {
            ( tableDatePair[booking.date] !== undefined ? 
                (tableDatePair[booking.date].includes(item.id) 
                ? 
                unavailableArr[index] = true
                : 
                console.log("Does NOT include the id", item.id) 
                ) 
            : console.log("e undefined") ) 

            return(
                unavailableArr[index] ? 
                <div id={index} className="table-btn-booking-unavailable" style={styleArr[index]} onClick={ () => selectTable(item, index) }> 
                Masa noua{index} 
          
                </div>
                :
                <div id={index} className="table-btn-booking" style={styleArr[index]} onClick={ () => selectTable(item, index) }> 
                Masa noua{index} 
          
                </div>
            )
          })
        }
    
      }


  return (
    <div>
     <div className="booking-container">
        <h2> Asezare restaurant </h2>
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
            {console.log("bookingggg",booking)}
    </div>

 } 
    </div>
  )
}
