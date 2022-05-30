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


export default function MakeReservation() {

  const { id } = useParams();
  const { currentUser } = useAuth()
  const [currentRestaurant, setCurrentRestaurant] = useState("")
  const [style, setStyle] = useState([]); 
  const [tables, setTables] = useState()
  const history = useHistory();
  const [date, setNewDate] = useState(new Date());

  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');

  const [bookedDate, setBookedDate] = useState('');
  const [bookedTable, setBookedTable] = useState('');
  const sceneSection = useRef(null);
  const [booking, setBooking] = useState({date:"", tableId:"", userId:"", restaurantId:"", bookingId:""})

  const dispatch = useDispatch();
  const mystate = useSelector(state => state.scene)

  async function getOneElement() {
    await db.collection('ProfileRestaurant').doc(id).get()
    .then(snapshot => {setCurrentRestaurant(snapshot.data())
                        console.log("heii")
                        setStyle(snapshot.data().style)
                        setTables(snapshot.data().tables)
    })
  }

//   db.collection('AllRestaurants').doc(currentUser.uid).collection('Tables').doc(scene.tables[tables].id).set({
//     ...scene.tables[tables],
//     ...scene.style[tables],
//     positionInArray: tables,

// }).then( () => {
//     dispatch({type: 'ADD_TABLES', scene})


// }).catch( (err) => {
//     dispatch({type: 'ADD_TABLES_ERROR', err})
// })

  function timeSlotValidator(slotTime) {
    const eveningTime = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      10,
      0,
      0
    );
    const isValid = slotTime.getTime() > eveningTime.getTime();
    return isValid;
  }
  

   useEffect(() => {
  
     getOneElement()

     booking.restaurantId=id;
     setBooking(booking)

      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });


  }, []);

  const handleScheduled = date => {
    // setIsScheduling(true);
    // setScheduleErr('');
    // fakeRequest(date)
    //   .then(json => {
    //     setScheduleErr('');
    //     setIsScheduled(true);
    //     console.log('fake response: ', json);
    //   })
    //   .catch(err => {
    //     setScheduleErr(err);
    //   })
    //   .finally(() => {
    //     setIsScheduling(false);
    //   });

    //getHours, getMinutes
    setBookedDate(date);

    console.log("data:", date)

    window.scrollTo({
      top: sceneSection.current.offsetTop,
      behavior: 'smooth',
    });

    }

    function selectTable(selectedTable){
      console.log("Masa aleasa:", selectedTable)
      setBookedTable(selectedTable.id)
       
    
    }


    function tableList(){
      let styleArr = style
      //console.log("Style array", styleArr)
      if(tables){
        return tables.map((item,index) => {
          //console.log("table style:", styleArr[index])
          // setStyle( styles=> [...styles, newStyle] )
          return(
            <div id={index} className="table-btn-booking" style={styleArr[index]} onClick={ () => selectTable(item) }> Masa noua{index} </div>
          )
        })
      }
  
    }

    function makeReservation(e){
      e.preventDefault();
      booking.bookingId=uuid();
      booking.userId=currentUser.uid;
      booking.date= bookedDate;
      booking.tableId= bookedTable;
      setBooking(booking);

  
      dispatch(bookTable(booking));
      console.log("dispatched")
    }

  return (
    <div>
      {console.log("booked table",bookedTable)}
      {/* {console.log("booking",booking)} */}
      <div className="date-time-picker">
      {/* <Calendar onChange={setNewDate} value={date} /> */}
      <DayTimePicker 
      timeSlotSizeMinutes={15} 
      timeSlotValidator={timeSlotValidator}
      isLoading={isScheduling}
      isDone={isScheduled}
      err={scheduleErr}
      onConfirm={handleScheduled}
      confirmText="Alege masa"
      />;
      </div>


      <div className="booking-container" ref={sceneSection}>
          <h2> Asezare restaurant </h2>
            <div id="sceneBooking" className='scene-booking' >
            {tableList()}
            </div>
      </div>
      <div className="book-btn-container">
        <button className="book-btn" onClick={e => makeReservation(e)}> Rezerva acum! </button>
        {console.log("bookingggg",booking)}
      </div>
    </div>
  )
}
