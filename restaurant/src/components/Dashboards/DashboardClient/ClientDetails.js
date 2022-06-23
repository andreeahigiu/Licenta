import React, { useState, useEffect  } from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { doc, onSnapshot, getDoc } from "firebase/firestore";


export default function ClientDetails() {
    
const { currentUser } = useAuth()
const [clientDetails, setClientDetails] = useState("")
const [clientDetailsOnce, setClientDetailsOnce] = useState("")
const [style, setStyle] = useState([]); 
const [tables, setTables] = useState()

const unsub = onSnapshot(doc(db, "ProfileCustomer", currentUser.uid), (doc) => {
  setClientDetails(doc.data())
});


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
