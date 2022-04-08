import React, { useRef, useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase"
import { onSnapshot, collection, setDoc, doc, getDoc, updateDoc, set } from "firebase/firestore"

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
        await setDoc(docRef, newEl)
        // await updateDoc(docRef, newEl)
        // docRef.set(newEl)


      }

      //function to get an element by id
    async function getOneElement() {
      // db.collection('ProfileCustomer').doc(currentUser.uid).get()
      // .then(snapshot => setOneData(snapshot.data()))

      const docRef = doc(db, "ProfileCustomer", currentUser.uid )
      const el = await getDoc(docRef)

      console.log("oneData:", el.data())

    }
  


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
      <button onClick={getOneElement} > get element by id </button>

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
