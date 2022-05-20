import React, { useEffect } from 'react'
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import './Restaurants.css'
import Grid from '@material-ui/core/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import chefHat from '../../utils/icons/Path 120.svg' 
import clock from '../../utils/icons/clock-svgrepo-com.svg' 
import money from '../../utils/icons/Group 57.svg' 
import star from '../../utils/icons/star-svgrepo-com.svg' 
import glass from '../../utils/icons/magnifying-glass.svg' 
import restaurantImg from '../../utils/images/restaurant.jpg' 
import { Form } from 'react-bootstrap';



export default function RestaurantCard({restaurants}) {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({stars: "10", distance: "10", cuisine: "10", waitingTime: "10"});
    let fieldName = ''

    const handleChange = (e) => {

      console.log("target", e.target)
      if(e.target.value != ''){
        // fieldName = e.target.name
        // filters.fieldName = e.target.value
        setFilters({...filters, [e.target.name]: e.target.value})
      }
    }
    console.log("filters: ", filters)

    useEffect(() => {
      restaurants && setIsLoading(false)
      console.log('In effect:', isLoading)
    }, [])


  return (

    <Grid
    container
    spacing={0}
    direction="column"

    style={{ minHeight: '100vh', marginBottom:'25vh'}}
   >

    <Grid item xs={3}>

    <div className="search-container">
        <TextField
          id="search-field"
          variant="outlined"
          label="Search"
          wi
        />

        {/* <img className="search-img" src={glass} alt="glass"/>  */}
        <button className="search-btn"> Cauta acum!</button>

    </div>

      <Box className="filters-container">
      <FormControl className="filters">
        <InputLabel id="demo-simple-select-label" >Numar stele</InputLabel>
        <Select
         
          labelId="stars"
          id="stars"
          name="stars"
          value={filters.stars}
          label="Numar stele"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>

        <FormControl className="filters">

        <InputLabel id="demo-simple-select-label" >Distanta centru</InputLabel>
        <Select

          labelId="demo-simple-select-label"
          id="distance"
          value={filters.distance}
          name="distance"
          label="Distanta centru"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>

        <FormControl className="filters"> 
        <InputLabel id="demo-simple-select-label" >Bucatarie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="cuisine"
          name="cuisine"
          value={filters.cuisine}
          label="Bucatarie"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>

        <FormControl className="filters">
        <InputLabel id="demo-simple-select-label" >Timp de asteptare</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="waitingTime"
          name="waitingTime"
          value={filters.waitingTime}
          label="Timp de asteptare"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>

    </Box>

      { 
        
         restaurants && restaurants.map( restaurant => {

           return(
        <Card sx={{ display: 'flex', width: '80vw', height: '25vh', marginLeft:'8vw', marginTop:'5vh' }}>

          <CardActionArea to={`/restaurante/${restaurant.id}`} component={Link} sx={{ display: 'flex'}} >

      <Box className='menu-container'>
        <img className='menu-image' src={restaurant.menuImage ? restaurant.menuImage : restaurantImg} alt='menu image'/>
      </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30vw' }}>
        <CardContent sx={{ flex: '1 0 auto', width:'50vw'}}>
          <Box className="name-stars">
            
          <Box>
          <Typography component="div" variant="h5">
            {restaurant.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {restaurant.location}
          </Typography>
          </Box>

          <Box className="stars"> 
          <div className="rating"> 3/5 </div>
          <img  className="small-star" src={star} alt="star" />
          </Box>

          </Box>

          <Box className="descrieri">
            <img  className="small-icon" src={clock} alt="clock" />
            <Box> Program </Box>

            <div className="vertical-bar"/>
            <img  className="small-icon" src={chefHat} alt="hat" />
            <Box> Bucatarie </Box>
            <div className="vertical-bar"/>
            <img  className="small-icon" src={money} alt="money" />
            <Box> $$$ </Box>
          </Box>

        </CardContent>
        
      </Box>
      </CardActionArea>

    </Card>


           )
         }
         )
    }



    </Grid>
    </Grid>
  )
}
