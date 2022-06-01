import { db } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { setDoc, Timestamp } from "firebase/firestore";
import { auth } from "../../firebase";
import { useState } from "react";


export const bookTable = (booking) => {
    let currentUser = auth.currentUser
    let restaurantId = booking.restaurantId
    let dbdata=[]
    
    return (dispatch, getState) => {
        db.collection('Bookings').doc(restaurantId).collection('BookingList').doc(booking.bookingId).set({
            ...booking,
            createdAt: new Date(),

        }).then( () => {
            dispatch({type: 'BOOK_TABLE', booking})


        }).catch( (err) => {
            dispatch({type: 'BOOK_TABLE_ERROR', err})
        })



    }
};