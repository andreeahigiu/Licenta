import React, { useRef, useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase"
import { onSnapshot, collection, setDoc, doc, getDoc, updateDoc, runTransaction } from "firebase/firestore"


export default function DashboardRestaurant() {
    const [error, setError] = useState("")
    const [data, setData] = useState([])
    const [oneData, setOneData] = useState([])
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const nameRef = useRef()
    const locationRef = useRef()
    const placesRef = useRef()
    const phoneRef = useRef()
    var assignedTable = false;

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push('/')
        } catch {
          setError('Failed to log out')
        }
      }

      console.log(data)
      useEffect(() =>  onSnapshot(collection(db, "ProfileRestaurant"), (snapshot) => {
          setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) ))
        }), 
        []);

    async function handleSubmit(e) {

        const docRef = doc(db, "ProfileRestaurant", currentUser.uid )
        const newEl = {name: nameRef.current.value, location: locationRef.current.value, places: placesRef.current.value, phone: phoneRef.current.value}
        await updateDoc(docRef, newEl)
        // await updateDoc(docRef, newEl)
        // docRef.set(newEl)

      }


    // //function to get an element by id
    // async function getOneElement() {
    //   // db.collection('ProfileCustomer').doc(currentUser.uid).get()
    //   // .then(snapshot => setOneData(snapshot.data()))

    //   const docRef = doc(db, "ProfileCustomer", currentUser.uid )
    //   const el = await getDoc(docRef)

    //   console.log("oneData:", el.data())


    // }

    // function intToChar(int) {
    //   // 👇️ for Uppercase letters, replace `a` with `A`
    //   const code = 'a'.charCodeAt(0);
    
    //   return String.fromCharCode(code + int);
    // }


    // async function createTable(name){
    //   var tablesIDS = [];
    //   var tablesNumber;
    //   console.log("in update");
    //   // const tableRef = db.collection('AllRestaurants').doc(new1)
    //   //   .collection('Tables').doc('tabeID1234');

    //   if( transaction() != null){
    //     tablesNumber = await transaction()
    //   }

    //   console.log("this is teh number", tablesNumber)

    //   const tableRef = db.collection('AllRestaurants').doc(name)
    //     .collection('Tables')
        
    //   const newTable = {occupied: false, places: 0, positionX:0, positionY: 0}

    //   for (var i=0; i<tablesNumber; i++){
    //     await setDoc(tableRef.doc(intToChar(i)), newTable)
    //   }

    // }


    // async function transaction(){

    //   var tablesNumber = null
    //   try {
    //     const docRef = db.collection('ProfileRestaurant').doc(currentUser.uid)
    //     await runTransaction(db, async (transaction) => {
    //       const sfDoc = await transaction.get(docRef);
    //       if (!sfDoc.exists()) {
    //         throw "Document does not exist!";
    //       }
      
    //       tablesNumber = sfDoc.data().places;

    //     });

    //   } catch (e) {
    //     console.log("Transaction failed: ", e);
    //   }
    //   console.log("Transaction successfully committed!", tablesNumber);
    //   return tablesNumber
    // }

    

    // function writeUserData(id1, id2, id3) {
    //   db.collection("users").doc(currentUser.uid).set({
    //     name: "Restaurant Name",
    //     tables: {
    //       table1ID: id1,
    //       table2ID: id2,
    //       table3ID: id3
    //     }
    //   }).then(function() {
    //     console.log("Restaurant created");
    //   });
    // }


  


  return (
    <div>

      <h2 className="title">Welcome!</h2>
      {currentUser.email}
      {currentUser.uid}


      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
        <input className="name" ref={nameRef} placeholder="Nume Restaurant"/>
        </label>

        <label className="label">
        <input className="surname"  ref={locationRef} placeholder="Locatie"/>
        </label>

        <label className="label">
        <input className="phone"  ref={placesRef} placeholder="Numar de locuri"/>
        </label>

        <label className="label">
        <input className="phone"  ref={phoneRef} placeholder="Contact"/>
        </label>

        <button className="update-profile-btn" type="submit">
          Actualizeaza profil
        </button>
      </form>

      <button onClick={handleLogout} > Log out </button>
      {/* <button onClick={createTable} > get element by id </button> */}

      {/* <ul>
        {data.map((element) => (
          <li key={element.id}>
            <div> {element.name} </div>
            <div> {element.location} </div>
            <div> {element.places} </div>
            <div> {element.phone} </div>
          </li>

          
        ))}
      </ul> */}

    </div>
  )
}
