import React, { useRef, useState, useEffect  } from 'react'
import { useParams } from 'react-router-dom';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import ReviewCard from './ReviewCard'
import back from '../../utils/icons/back-arrow.svg' 
import star from '../../utils/icons/star-svgrepo-com.svg' 
import './booking.css'
import { useSelector, useDispatch } from 'react-redux';
import { bookTable } from '../../store/actions/bookTableAction';

import Carousel from 'react-material-ui-carousel'
import Paper from '@mui/material/Paper';
import { Link } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { render } from 'react-dom';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import {v4 as uuid} from "uuid";
// import ClockLoader from "react-spinners/ClockLoader";
import ClockLoader from "react-spinners/ClockLoader";
import { css } from "@emotion/react";
import { connectStorageEmulator } from 'firebase/storage';
import { Data } from '@react-google-maps/api';
import { ContentCutOutlined } from '@mui/icons-material';
import TablesBooking from './tablesBooking';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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


export default function MakeReservation() {

  const { id } = useParams();
  const { currentUser } = useAuth()
  const [currentRestaurant, setCurrentRestaurant] = useState("")
  const [style, setStyle] = useState([]); 
  const [tables, setTables] = useState()
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState(false);
  
  const[usedDates, setUsedDates] = useState("");
  const [continueToScene, setContinueToScene] = useState(false)


  const [bookedTables, setBookedTables] = useState([]); //stare cu toate id-urile meselor din tabelul de rezervari
  const [ bookingList, setBookingList] = useState(""); //stare cu toate rezervarile din bd


  const sceneSection = useRef(null);
  const [booking, setBooking] = useState({date:"", tableId:"", userId:"", restaurantId:"", bookingId:""})   //rezervarea in decurs de desfasurare
  const [tableDatePair, setTableDatePair] = useState();  //stare cu key-vlue pt data rezervare-mese rezervate

  const dispatch = useDispatch();
  const mystate = useSelector(state => state.scene)
  let clickedForolor = false;

  // var myArray = {id1: [100, 200], id2: 200, "tag with spaces": 300};
  // myArray.id1.push(300);
  // myArray["id4"] = 500;



//db.collection('Bookings').doc(restaurantId).collection('BookingList').doc(booking.bookingId)


  async function getOneElement() {
    await db.collection('ProfileRestaurant').doc(id).get()
    .then(snapshot => {setCurrentRestaurant(snapshot.data())
                        console.log("heii")
                        setStyle(snapshot.data().style)
                        setTables(snapshot.data().tables)
    })
  }


  function timeSlotValidator(slotTime) {
    const workingSchedule = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      8,
      0,
      0
    );

    const workingSchedule2 = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      23,
      0
    );
    // console.log("SLOT TIME:", slotTime.getTime())
    // console.log("ELEMENT TIME:", slotTime.getTime())
    // const isValid = slotTime.getTime() > eveningTime.getTime();
    //const isValid = slotTime.getTime() <= usedDates[1];
    for (const element of usedDates){
      // console.log("ELEMENT TIME:", element.getTime())
      //slotTime.getTime() == element.getTime()
      if (slotTime.getTime()< workingSchedule.getTime() || slotTime.getTime() > workingSchedule2.getTime())
        return false;
    }
    return true;
  }
  
  // useEffect(() => {

  //     if(booking.date)
  // }, [booking])

   useEffect(() => {
  
     getOneElement()

     booking.restaurantId=id;
     setBooking(booking)

     db.collection('Bookings').doc(id).collection('BookingList')
     .get()
     .then( snapshot => {
       const dates = []
       const tablesIds = []
       const bookings = []
       const tableDate = {}
       let convertedDate = ''

       snapshot.forEach( doc => {


         let data = doc.data()
         const bookingID = data.bookingId

         bookings.push(data);

        if(data.date != ""){
          // console.log("converting data: ", data.date.toDate())
          convertedDate = data.date.toDate()
          dates.push(convertedDate)
        }
        tablesIds.push(data.tableId)
        //dates.push(data.date)

        
        if(tableDate[convertedDate] == undefined){
          tableDate[convertedDate] = []
        }


        tableDate[convertedDate].push(data.tableId)

       })
       setBookingList(bookings)
       setUsedDates(dates)
       setBookedTables(tablesIds)
       setTableDatePair(tableDate)
       
     })

     console.log("datele scoase din db:", usedDates)
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });


  }, []);

  console.log("PAIRS----------", tableDatePair)
  // useEffect(() => {
  //   // run something every time name changes
  //   console.log("in use effect, booking",booking);
  // }, [booking]); // <-- dependency array


  // booking.bookingId=uuid();
  // booking.userId=currentUser.uid;
  // booking.date= bookedDate;
  // booking.tableId= bookedTable;
  // setBooking(booking);
  
  //console.log("datele scoase din db:", usedDates)

  const handleScheduled = date => {

    //setBookedDate(date);

    booking.bookingId=uuid();
    booking.userId=currentUser.uid;
    booking.date= date;
    setBooking(booking);

    console.log("data:", date)

    // window.scrollTo({
    //   top: sceneSection.current.offsetTop,
    //   behavior: 'smooth',
    // });
    setContinueToScene(true)

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
    {console.log("SALLLLL......", booking.date)}
     
    //tableDatePair[booking.date] !== undefined
    function tableList(){
      let styleArr = style
      if(tables){
        return tables.map((item,index) => {
          return(
            <div id={index} className="table-btn-booking" style={styleArr[index]} onClick={ () => selectTable(item, index) }> 
            Masa noua{index} 
            {/* {console.log("HEIIIII......", tableDatePair)}

            { ( tableDatePair[booking.date] !== undefined ? (tableDatePair[booking.date].includes(item.id) ? console.log("includes the id", item.id) : console.log("Does NOT include the id", item.id) ) 
                                                          : console.log("e undefined") ) }  */}
            </div>
          )
        })
      }
  
    }

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

  return (
    <div>

      {/* {console.log("booking",booking)} */}
      <div className="date-time-picker">
      {/* <Calendar onChange={setNewDate} value={date} /> */}
      <DayTimePicker 
      timeSlotSizeMinutes={30} 
      timeSlotValidator={timeSlotValidator}
      // isLoading={isScheduling}
      // isDone={isScheduled}
      // err={scheduleErr}
      onConfirm={handleScheduled}
      confirmText="Alege masa"
      />;
      </div>


      { continueToScene == true && (<TablesBooking tableDatePair={tableDatePair} booking={booking} style={style} tables={tables}/>)}

      {/* <div className="booking-container" ref={sceneSection}>
          <h2> Asezare restaurant </h2>
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
            {console.log("bookingggg",booking)}
    </div>

} */}
</div>

  )
}
