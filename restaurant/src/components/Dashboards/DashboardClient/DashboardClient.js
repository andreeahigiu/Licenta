import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';

import Paper from '@mui/material/Paper';

import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import Input from '@mui/material/Input';

import { Avatar, Badge, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { db } from '../../../firebase';
import MyBookings from './MyBookings';
import { updateClient } from '../../../store/actions/updateClientAction';
import LogoutIcon from '@mui/icons-material/Logout';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../firebase';
import "./DashboardClient.css"



export default function DashboardClient() {

  const {logout, currentUser} = useAuth();
  const history = useHistory()
  const [disabledFields, setDisabledFields] = useState(true)
  const [clientDetails, setClientDetails] = useState({name: "prenume", surname:"nume", phone:"07xxxx", email:"customer@email.com", profileImage: ''})
  const [fetchedDetails, setFetchedDetails]=useState(false)
  const [currentRestaurants, setCurrentRestaurants] = useState([])
  const isFirstRender = useRef(true)
  const el = []
  const dispatch = useDispatch();


  function handleDetailsChange(e){
    console.log("valoare modificata:", e.target)
    const valName= e.target.name
    clientDetails[valName] = e.target.value
    setClientDetails(clientDetails)
  }


  async function getOneElement() {
    await db.collection('ProfileCustomer').doc(currentUser.uid).get()
    .then(snapshot => {setClientDetails(snapshot.data())
    })
     setFetchedDetails(true)
  }


   useEffect(() => {
  
     getOneElement()
     isFirstRender.current = false
  
  }, []);

  useEffect( () => {

    if (!isFirstRender.current && clientDetails && clientDetails.myBookings) {

      for(const item of clientDetails.myBookings){

      db.collection('ProfileRestaurant').doc(item.restaurantId).onSnapshot((doc) => {  
        if(doc){
          console.log("the DOC", doc.data())
          let data= doc.data()
          if(data){
            el.push(data)
          }
        }    
      })
    }
    setCurrentRestaurants(el)

    }
  }, [clientDetails])



function saveDetails(e){
  setDisabledFields(true)

  dispatch(updateClient(clientDetails)) 
  console.log("dispatched")
}

  async function handleLogout(){
    try {
      await logout()

      history.push("/")
    } catch {
      console.log('Failed to log out')
    }
}

function handleAvatarInput(e){
  let file = e.target.files[0];

  console.log("uploaded file: ",file);

  const storageRef = ref(storage, `/avatars/${file.name}`);//second param is the location in the firebase storage where we wanna save the files
  const uploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on("state_changed", (snapshot) => {
    const prog = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) *100 );
  }, (err) => console.log(err),
  () => {
    getDownloadURL(uploadTask.snapshot.ref)
    .then(url => setClientDetails({...clientDetails, profileImage: url}) )
  }
  )
}

console.log("detaliile",clientDetails)

  return (

<div className="dash-container">

<div className='paper-container'>
    <Paper sx={{ width: '20rem', height: '75vh', maxWidth: '100%', m: '10px', mt: '60px'}} className="paper-styles">

{disabledFields 
?
<div className="client-details-db">

  <div className="avatar">
    <Avatar alt={clientDetails.name} src={clientDetails.profileImage} 
      style={{
      margin: "10px",
      width: "100px",
      height: "100px",
     }} />
  </div>


  <div className="name-surname">

  <div>
    {clientDetails.name ? clientDetails.name : "Prenume"}
  </div>
  <div style={{marginLeft: '0.5rem'}} >
    {clientDetails.surname? clientDetails.surname : "Nume" }
  </div>
  </div>

  <div className="phone-div">
    {clientDetails.phone ? clientDetails.phone : "Nr.telefon" }
  </div>
  <div className="email-div">
    {clientDetails.email? clientDetails.email : "Email" }
  </div>
</div>

:

<div className="update-form"> 



<div className="update-profile-pic">


<label htmlFor="icon-button-file">
  <Input accept="image/*" id="icon-button-file" type="file" style={{display: "none"}} onChange={handleAvatarInput}/>
  <IconButton color="primary" aria-label="upload picture" component="span">
  <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <EditIcon  style={{ color: "rgb(55, 40, 22)" }}/>
        }
      >
  <Avatar 
     alt={clientDetails.name}
     src={clientDetails.profileImage} 
     style={{
      margin: "10px",
      width: "100px",
      height: "100px",
     }} 
    />
    </Badge>
  </IconButton>
</label>

</div>

<TextField
          disabled={disabledFields}
          InputLabelProps={{ shrink: true }}
          id="standard-disabled"
          label="Prenume"
          defaultValue= {clientDetails.name != "" ? clientDetails.name : "Prenume"}
          variant="standard"
          onChange={handleDetailsChange}
          name="name"
        />

<TextField
          disabled={disabledFields}
          InputLabelProps={{ shrink: true }}
          id="standard-disabled"
          label="Nume"
          defaultValue= {clientDetails.surname}
          variant="standard"
          onChange={handleDetailsChange}
          name="surname"
        />
<TextField
          disabled={disabledFields}
          InputLabelProps={{ shrink: true }}
          id=""
          label="Nr. telefon"
          defaultValue={clientDetails.phone}
          variant="standard"
          onChange={handleDetailsChange}
          name="phone"
        />
            <TextField
          disabled={disabledFields}
          InputLabelProps={{ shrink: true }}
          id=""
          label="Email"
          defaultValue={clientDetails.email}
          variant="standard"
          onChange={handleDetailsChange}
          name="email"
        />

</div>

}
{ console.log("clientDeatails surnameee here", clientDetails.surname) }
<span className="white-space"></span>
<div className="bottom-buttons">
    <div className="logout-btn-container">
      <Button className="logout-btn" onClick={handleLogout} style={{ color: "rgb(55, 40, 22)", '&:hover': {
      backgroundColor: '#f59342',
      color: '#3c52b2',
  },}}> 
      <LogoutIcon style={{ color: "rgb(55, 40, 22)"}}/> 
        Logout
      </Button>
    </div>


  <label htmlFor="icon-button" className="edit-btn">
  {disabledFields ?
          <IconButton className="save-details-btn" color="primary" aria-label="edit details" component="span" onClick={() => setDisabledFields(false)}>
          <EditIcon style={{ color: "rgb(184, 133, 76)" }}/>
  </IconButton>

  :

  <Button variant="outlined" className="save-details-btn" onClick={() => saveDetails()} style={{ color: "rgb(184, 133, 76)", borderColor: "rgb(184, 133, 76)" }}>Salveaza</Button>

  }

  </label>
  </div>

</Paper>
</div>

<div className="dash-content-client" id="my-bookings">
  { fetchedDetails && <MyBookings clientDetails={clientDetails} allRestaurants={currentRestaurants}/>}


</div>

</div>
  )
}
