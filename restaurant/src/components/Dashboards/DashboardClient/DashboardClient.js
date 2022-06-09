import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import UpdateDetailsClient from './UpdateDetailsClient'
import {Component} from 'react'

import { withStyles } from '@material-ui/core/styles';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom'
import ClientDetails from './ClientDetails';

import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { Avatar, Badge, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import MyBookings from './MyBookings';
import MyReviews from './MyReviews';
import { updateClient } from '../../../store/actions/updateClientAction';
import LogoutIcon from '@mui/icons-material/Logout';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../firebase';

const styles = theme =>  ({
  paper:{
      display:'flex',
      boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius:'25px',
      alignItems:'center',
      textAlign: 'center',
      verticalAlign: 'middle',
      align: 'middle',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'sticky',
      top: '140px',

    },
  menuItem:{
      paddingTop : '100px',
  },
});


export default function DashboardClient() {

  const {logout, currentUser} = useAuth();
  const history = useHistory()
  const [menuSelection, setMenuSelection] = useState("client")
  const [disabledFields, setDisabledFields] = useState(true)
  // const { currentUser } = useAuth()
  const [clientDetails, setClientDetails] = useState({name: "prenume", surname:"nume", phone:"07xxxx", email:"customer@email.com", profileImage: ''})
  const [clientDetailsOnce, setClientDetailsOnce] = useState()
  const [updatedFields, setUpdatedFields] = useState()
  const [fetchedDetails, setFetchedDetails]=useState(false)
  const [profileImage, setProfileImage] = useState()

  const dispatch = useDispatch();
  // const mystate = useSelector(state => state.scene)


  // const unsub = onSnapshot(doc(db, "ProfileCustomer", currentUser.uid), (doc) => {
  //   //console.log("Current data: ", doc.data());
  //   //currentUser.push(doc.data());
  //   setClientDetails(doc.data())
  //   // setStyle(doc.data().style)
  //   // setTables(doc.data().tables)
  // });


  function scrollToTop() {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  function handleDetailsChange(e){
    console.log("valoare modificata:", e.target)
    // clientDetails[e.target.id]= e.target.value
    const valName= e.target.name
    clientDetails[valName] = e.target.value
    // let updatedVal = {[e.target.name]: e.target.value}
    // setClientDetails(oldVal => ({
    //   ...oldVal,
    //   updatedVal
    // }))
    setClientDetails(clientDetails)
  }


  async function getOneElement() {
    await db.collection('ProfileCustomer').doc(currentUser.uid).get()
    .then(snapshot => {setClientDetails(snapshot.data())
    })

    setFetchedDetails(true)

  }
  
  // console.log("client details:", clientDetails)
  
   useEffect(() => {
  
     getOneElement()
  
  
  }, []);

  function handleClick(selection) {
    // menuSelection=selection
    setMenuSelection(selection)
    scrollToTop()

}

function saveDetails(e){
  setDisabledFields(true)

  dispatch(updateClient(clientDetails)) 
  console.log("dispatched")
}

  async function handleLogout(){
    // try {
    //     await auth.signOut()
    //     //navigate('/')
    //   } catch {
    //     console.log('Failed to log out')
    //   }
    try {

      await logout()

      // setIsAuth(true)
      // localStorage.setItem("isAuth", true)
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
    {clientDetails.name}
  </div>
  <div style={{marginLeft: '0.5rem'}} >
    {clientDetails.surname}
  </div>
  </div>

  <div className="phone-div">
    {clientDetails.phone}
  </div>
  <div className="email-div">
    {clientDetails.email}
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
          defaultValue= {clientDetails.name}
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

<div className="dash-content">
 
  {fetchedDetails && <MyBookings clientDetails={clientDetails}/>}


</div>


<Paper sx={{overflow: 'auto', maxHeight: '35vh', maxWidth: '100%', m: '10px', mt: '60px', ml: '5vw'}} className={styles.paper}>

<MyReviews />


</Paper>


</div>
  )
}
