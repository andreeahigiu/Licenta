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
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { FormHelperText, Input, OutlinedInput, Select } from '@mui/material';
// import { Button } from 'react-bootstrap';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import "./DashboardClient.css"

export default function UpdateDetailsClient() {


    async function handleImageFieldChange(e) {
  
        let file = e.target.files[0];
    
        console.log("uploaded file: ",file);
    
        // const storageRef = ref(storage, `/files/${file.name}`);//second param is the location in the firebase storage where we wanna save the files
        // const uploadTask = uploadBytesResumable(storageRef, file)
    
        // uploadTask.on("state_changed", (snapshot) => {
        //   const prog = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) *100 );
        // }, (err) => console.log(err),
        // () => {
        //   getDownloadURL(uploadTask.snapshot.ref)
        //   .then(url => this.setState( {menuImage: url}))
        // }
        // )
    
      }
    
  function handleChange(e) {
    console.log("target Val:", e.target)
    // if(e.target.value != ''){
    //   if(e.target.id == undefined){
    //     this.setState({
    //       [e.target.name]: e.target.value
    //     })
    //   }
    //   else {
    //     this.setState({
    //       [e.target.id]: e.target.value
    //     })
    //   }

    // }

  }

  
  function handleSubmit(e) {
    e.preventDefault();
    //console.log(this.state);
    //this.props.updateRestaurant(this.state)
  }

    function handleSubmit(e){
        // e.preventDefault();
        // //console.log(this.state);
        // this.props.updateRestaurant(this.state)
      }

  return (
  <div className="deails-wrap">
    <div className="details-title"> Moldifica profil </div>
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '30vw' },
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
      disabled
        id="outlined-surname"
        label="Nume"
        // value={name}
        onChange={handleChange}
      />
      <TextField
      disabled
        id="outlined-name"
        label="Prenume"
        // defaultValue="foo"
        onChange={handleChange}
      />
            <TextField
        id="outlined-email"
        label="Email"
        // value={name}
        onChange={handleChange}
      />
            <TextField
        id="outlined-phone"
        label="Telefon"
        // value={name}
        onChange={handleChange}
      />

      <TextField
        id="outlined-address"
        label="Adresa"
        // value={name}
        onChange={handleChange}
      />
    </Box>



      
  </div>
  )
}
