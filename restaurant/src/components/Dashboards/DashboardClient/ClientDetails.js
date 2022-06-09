import React, { useState, useEffect  } from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';


import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import { Carousel } from 'react-carousel-minimal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function ClientDetails() {
    
const { currentUser } = useAuth()
const [clientDetails, setClientDetails] = useState("")
const [clientDetailsOnce, setClientDetailsOnce] = useState("")
const [style, setStyle] = useState([]); 
const [tables, setTables] = useState()

const unsub = onSnapshot(doc(db, "ProfileCustomer", currentUser.uid), (doc) => {
  //console.log("Current data: ", doc.data());
  //currentUser.push(doc.data());
  setClientDetails(doc.data())
  // setStyle(doc.data().style)
  // setTables(doc.data().tables)
});
//console.log("Data in state:", currentUser);

//let pics = currentUser.gallery
//console.log("gallery:", pics)


async function getOneElement() {
  await db.collection('ProfileCustomer').doc(currentUser.uid).get()
  .then(snapshot => {setClientDetailsOnce(snapshot.data())
  })
}


 useEffect(() => {

   getOneElement()


}, []);

function placeDiv(e){
  console.log("x si y:", e.clientX, e.clientY)

}

  return (

<div className='client-details-container'>
      {/* {console.log("userul :", clientDetails)} */}

            <List>
                <ListItem>
                  <ListItemText>
                    Nume: {clientDetails.surname}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Prenume: {clientDetails.name}
                  </ListItemText>
                </ListItem>


                <ListItem>
                  <ListItemText>
                    Telefon: {clientDetails.phone}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Email: {clientDetails.email}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Rezervarile mele: 
                  </ListItemText>
                </ListItem>

    
            </List>

    </div>
  )
}
