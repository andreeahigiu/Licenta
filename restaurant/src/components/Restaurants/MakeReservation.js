import React, { useRef, useState, useEffect  } from 'react'
import { useParams } from 'react-router-dom';
import { doc, onSnapshot, getDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import back from '../../utils/icons/back-arrow.svg' 
import './booking.css'
import { useSelector, useDispatch } from 'react-redux';
import { bookTable } from '../../store/actions/bookTableAction';
import 'react-calendar/dist/Calendar.css';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import {v4 as uuid} from "uuid";
// import ClockLoader from "react-spinners/ClockLoader";
import { css } from "@emotion/react";
import TablesBooking from './tablesBooking';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Route } from 'react-router-dom';


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
  const [booking, setBooking] = useState({date:new Date(), tableId:"", userId:"", restaurantId:"", bookingId:"", bookedFor:1, endOfBooking:new Date()})   //rezervarea in decurs de desfasurare
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
                        setStyle(snapshot.data().style)
                        setTables(snapshot.data().tables)
    })
  }

  async function updateBookings(){
    
    const currentDate = Date().toLocaleString();
    //await (db.collection('Bookings').doc(restaurantId).collection('BookingList').doc(booking.bookingId))
    //await deleteDoc(doc(db, "cities", "DC"));
    //console.log("BOOKINGS LIST:", bookingList)
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

    for (const element of usedDates){
      //slotTime.getTime() == element.getTime()
      if (slotTime.getTime()< workingSchedule.getTime() || slotTime.getTime() > workingSchedule2.getTime())
        return false;
    }
    return true;
  }
  

   useEffect(() => {

    const currentDate = Date().toLocaleString();
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
       let convertedEndOfBooking = ''

       snapshot.forEach( doc => {

         let data = doc.data()

         const bookingID = data.bookingId
         bookings.push(data);

        console.log("data.date:", data.date)

        if(data.date){
          convertedDate = structuredClone(data.date.toDate())
          dates.push(convertedDate)
        }

        if(data.endOfBooking != undefined && data.endOfBooking != ""){
          convertedEndOfBooking = data.endOfBooking.toDate()
          //console.log("AAAAAAAA", convertedEndOfBooking)
        }

        tablesIds.push(data.tableId)
        
        if(tableDate[convertedDate] == undefined){
          tableDate[convertedDate] = []
        }

        while( convertedEndOfBooking != '' && convertedDate.getTime() < convertedEndOfBooking.getTime()){
          tableDate[convertedDate].push(data.tableId)
          convertedDate.setTime(convertedDate.getTime() + 0.5 * 60 * 60 * 1000)
          tableDate[convertedDate] = []
          //console.log("Transformarea lui convertedTime", convertedDate)
        }

        //console.log("ARRAYUL:", tableDate)

       })
       setBookingList(bookings)
       setUsedDates(dates)
       setBookedTables(tablesIds)
       setTableDatePair(tableDate)


       
     })
     updateBookings()
     //console.log("datele scoase din db:", usedDates)
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });


  }, []);

  // useEffect(() => {
  //   endOfBooking()
  //   // const endOfBooking = new Date(booking.date.getTime() + booking.bookedFor * 60 * 60 * 1000);
  //   // console.log("end of booking", endOfBooking)
  //   // // booking.endOfBooking = endOfBooking
  //   // // setBooking(booking)
  //   // setBooking({...booking, endOfBooking: endOfBooking})

  // }, [booking])

  //console.log("PAIRS----------", tableDatePair)
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
  function endOfBooking(){
    const endOfBooking = new Date(booking.date.getTime() + booking.bookedFor * 60 * 60 * 1000);
    console.log("end of booking", endOfBooking)
    // booking.endOfBooking = endOfBooking
    setBooking(prevState => ({...prevState, endOfBooking: endOfBooking}))
    
  }

  const handleScheduled = date => {

    //setBookedDate(date);

    booking.bookingId=uuid();
    booking.userId=currentUser.uid;
    booking.date= date;
    setBooking(booking);

    const endOfBooking = new Date(booking.date.getTime() + booking.bookedFor * 60 * 60 * 1000);
    booking.endOfBooking= endOfBooking;
    setBooking(booking);


    console.log("end of booking", endOfBooking)
    const newBooking = { bookingId: uuid(), userId:currentUser.uid, date: date, endOfBooking: endOfBooking}



    //endOfBooking()

    console.log("data:", date)
    console.log("Table-Date pair:", tableDatePair)

    // window.scrollTo({
    //   top: sceneSection.current.offsetTop,
    //   behavior: 'smooth',
    // });
    setContinueToScene(true)

    history.push(`/restaurante/${id}/rezervare/masa`, {tableDatePair:tableDatePair, booking:booking, style:style, tables:tables})

    }

    // function selectTable(selectedTable, index){
    //   clickedForolor = !clickedForolor;
    //   console.log("Masa aleasa:", selectedTable)
    //   // setBookedTable(selectedTable.id)
    //   booking.tableId= selectedTable.id;
    //   setBooking(booking);
    //   var col=document.getElementById(index);
    //   if(clickedForolor == true){
    //     col.style.backgroundColor="rgb(242, 197, 137)";
    //   }else{
    //     col.style.backgroundColor="rgb(204, 117, 4)";
    //   }
    
    // }
     
    // //tableDatePair[booking.date] !== undefined
    // function tableList(){
    //   let styleArr = style
    //   if(tables){
    //     return tables.map((item,index) => {
    //       return(
    //         <div id={index} className="table-btn-booking" style={styleArr[index]} onClick={ () => selectTable(item, index) }> 
    //         Masa noua{index} 
    //         </div>
    //       )
    //     })
    //   }
  
    // }

    const handleChangeTime = (e) => {

      //console.log("target", e.target)
      if(e.target.value != ''){
        setBooking({...booking, [e.target.name]: e.target.value})

      }
    }

    const handleChangeSeats = (e) => {

      //console.log("target", e.target)
      if(e.target.value != ''){
        setBooking({...booking, [e.target.name]: e.target.value})

      }
    }
    console.log("BOOKINGS:", booking)

    function makeReservation(e){
      e.preventDefault();
      setLoading(true);
  
      dispatch(bookTable(booking)) 
      console.log("dispatched")

      setTimeout(() => {
        setLoading(false)
        setConfirmMsg(true)
      }, 2000)

    }

  return (
    <div>
      <Box className="booking-time-container">
        <p className="booking-time-p">Selectati pentru cate ore doriti sa faceti reervarea!</p>
        <p className="booking-time-p">Atentie! O masa este rezervata implicit pentru o ora, daca nu selectati o alta durata!</p>
      <FormControl className="booking-time-dropdown">
        <InputLabel id="demo-simple-select-label" >Durata rezervare</InputLabel>
        <Select
         
          labelId="bookedFor"
          id="bookedFor"
          name="bookedFor"
          value={booking.bookedFor}
          label="Durata rezervare"
          onChange={handleChangeTime}
        >
          <MenuItem value={1}>O ora</MenuItem>
          <MenuItem value={2}>Doua ore</MenuItem>
          <MenuItem value={3}>Trei ore</MenuItem>
          <MenuItem value={4}>Patru ore</MenuItem>
          <MenuItem value={5}>Cinci ore</MenuItem>
        </Select>
        </FormControl>

        <FormControl className="booking-time-dropdown">
        <InputLabel id="demo-simple-select-label" >Nr. locuri</InputLabel>
        <Select
         
          labelId="seatsNr"
          id="seatsNr"
          name="seatsNr"
          value={booking.seatsNr}
          label="Nr. locuri"
          onChange={handleChangeSeats}
        >
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          
        </Select>
        </FormControl>

    </Box>

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

      

      {/* { continueToScene == true && (<TablesBooking tableDatePair={tableDatePair} booking={booking} style={style} tables={tables}/>)} */}
      {/* { continueToScene == true && (<Route path={`/restaurante/${id}/rezervare/masa`} element={<TablesBooking tableDatePair={tableDatePair} booking={booking} style={style} tables={tables}/>} />)} */}

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
