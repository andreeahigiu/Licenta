import React, { useEffect, useState } from 'react'
import BookingsCalendarCard from './BookingsCalendarCard'
import { doc, onSnapshot, getDoc  } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';
import './BookingsCalendar.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TextField from '@mui/material/TextField';
import firebase from 'firebase/compat/app';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BookingsCalendar() {
    const [allBookings, setAllBookings] = useState("")
    const [ids, setIds] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const {currentUser} = useAuth()
    const [pickedDate, setPickedDate] = useState(new Date())
    const [filteredBookings, setFilteredBookings] = useState("")


    // const unsub = onSnapshot(doc(db, "ProfileRestaurant", currentUser.uid), (doc) => {
    //     //console.log("Current data: ", doc.data());
    //     //currentRestaurant.push(doc.data());
    //     setCurrentRestaurants(doc.data())
    //     // setStyle(doc.data().style)
    //     // setTables(doc.data().tables)
    //   });

    //   async function getOneElement() {
    //     await db.collection('ProfileRestaurant').doc(id).get()
    //     .then(snapshot => {setCurrentRestaurant(snapshot.data())
    //                         console.log("heii")
    //                         setStyle(snapshot.data().style)
    //                         setTables(snapshot.data().tables)
    //     })
    //   }

      
      useEffect(() => {
  
        // getOneElement()

        db.collection('Bookings').doc(currentUser.uid).collection('BookingList')
        .get()
        .then( snapshot => {
          const bookings = []
          const idsArray = []
          snapshot.forEach( doc => {
            let data = doc.data()
            data.id = doc.id
            bookings.push(data)
    
            idsArray.push( doc.id )
          })
          setAllBookings(bookings)
          setFilteredBookings(bookings)
          setIds(idsArray)
          setIsLoading(false)
          
        })
   
         window.scrollTo({
           top: 0, 
           behavior: 'smooth'

         });

   
   
     }, []);



     function filterDates(newValue){

         setPickedDate(newValue)
         var myArray = structuredClone(allBookings)
         console.log("My Array:", myArray)
         const filteredArray = myArray.filter((item) => {
            var newDate = new Date(item.date.seconds*1000).toLocaleDateString()
            console.log("checking the dates", newDate == newValue.toLocaleDateString())
            return newDate === newValue.toLocaleDateString();
         })

         const sortedArray= filteredArray.sort(
          (item1, item2) => Number(new Date(item1.date.seconds*1000)) - Number(new Date(item2.date.seconds*1000))
         )

         console.log("THE SORTED ARRAY:", sortedArray)

         console.log("The new filtered array", filteredArray)
         setFilteredBookings(filteredArray)

     }
   
     console.log("all the bookings:", allBookings)
     console.log("Filtered Bookings", filteredBookings)
    

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div className="calendar-container">
      <h2 className="section-title">Calendar Rezervari</h2>
      <div className="pick-date-container">
          <div className="date-text">
              {pickedDate.toLocaleDateString("ro-RO", { weekday: 'long' }) + ", " + pickedDate.getDate() + " " + pickedDate.toLocaleDateString("RO-ro", { month: 'long' })}
          </div>
          <div className="date-picker">
          
            <DatePicker
            label="Data"
            value={pickedDate}
            onChange={(newValue) => {
                filterDates(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            />
         
          </div>
          {console.log("PickedDate:", pickedDate)}
      </div>
      <div className="horizontal-line"/>
      <div className="table-top">
          <div>
              <AccessTimeIcon />
          </div>
          <div>Detalii Client</div>
          <div>Masa Rezervată </div>
      </div>
      {isLoading?
    <div className="is-loading"> Loading... </div>
    :
    filteredBookings.map((item,index) => {
         //console.log("the date: ", index, ":", item.date.toDate())
        return( <BookingsCalendarCard booking={item}/> )
     })}
    
    {/* .sort((a, b) => (a.date.seconds*1000).toDate() - (b.date.seconds*1000).toDate()) */}
    

    </div>
    </LocalizationProvider>
  )
}
