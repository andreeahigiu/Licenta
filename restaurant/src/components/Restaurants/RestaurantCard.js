import React, { useEffect } from 'react'
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import restaurantImg from '../../utils/images/restaurant.jpg' 
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';



export default function RestaurantCard({restaurants}) {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({stars: "", prices: "", cuisine: "", waitingTime: ""});
    const [search, setSearch] = useState("");
    const [searchBtn, setSearchBtn] = useState("")
    let fieldName = ''

    const handleChange = (e) => {

      if(e.target.value != ''){
        setFilters({...filters, [e.target.name]: e.target.value})
      }
    }
    console.log("filters: ", filters)

    useEffect(() => {
      restaurants && setIsLoading(false)
    }, [])

    function handleSearch(e){
      e.preventDefault();
      console.log("Searched for:", e.target.value);
      setSearch(e.target.value);
    }

    function restaurantCuisine(restaurant){
      console.log("The cuisine:", restaurant.cuisine)
      if(restaurant.cuisine === 1){
        return "Americana"
      }
      if(restaurant.cuisine === 2){
        return "Asiatica"
      }
      if(restaurant.cuisine === 3){
        return "Europeana"
      }
      if(restaurant.cuisine === 4){
        return "Italiana"
      }
      if(restaurant.cuisine === 5){
        return "Romaneasca"
      }

    }

    function restaurantPricing(restaurant){
      if(restaurant.pricing === 1){
        return "$"
      }
      if(restaurant.pricing === 2){
        return "$$"
      }
      if(restaurant.pricing === 3){
        return "$$$"
      }
      if(restaurant.pricing === 4){
        return "$$$$"
      }
    }

    function clearFilters(){
      setFilters({stars:"", prices: "", cuisine:"", waitingTime:""});
    }


  return (

    <Grid
    container
    spacing={0}
    direction="column"

    style={{ minHeight: '100vh', marginBottom:'25vh'}}
   >

    <Grid item xs={3}>

    <Box
      className="search-container">

        <TextField
          id="search-field"
          variant="outlined"
          label="Search"
          onChange={e => handleSearch(e)}
          
        />

    </Box>

      <Box className="filters-container">

<FormControl className="filters">

<InputLabel id="demo-simple-select-label" >Preturi</InputLabel>
<Select

  labelId="Preturi"
  id="prices"
  value={filters.prices}
  name="prices"
  label="Preturi"
  onChange={handleChange}
>

  <MenuItem value={1}>Ieftin</MenuItem>
  <MenuItem value={2}>Mediu</MenuItem>
  <MenuItem value={3}>Scump</MenuItem>
  <MenuItem value={4}>Delux</MenuItem>
</Select>
</FormControl>

        <FormControl className="filters"> 
        <InputLabel id="demo-simple-select-label" >Bucătărie</InputLabel>
        <Select
          labelId="Bucatarie"
          id="cuisine"
          name="cuisine"
          value={filters.cuisine}
          label="Bucatarie"
          onChange={handleChange}
        >

          <MenuItem value={1}>Americană</MenuItem>
          <MenuItem value={2}>Asiatică</MenuItem>
          <MenuItem value={3}>Europeană</MenuItem>
          <MenuItem value={4}>Italiană</MenuItem>
          <MenuItem value={5}>Românească</MenuItem>
        </Select>
        </FormControl>

        <FormControl className="filters">
        <InputLabel id="demo-simple-select-label" >Timp de așteptare</InputLabel>
        <Select
          labelId="Timp de asteptare"
          id="waitingTime"
          name="waitingTime"
          value={filters.waitingTime}
          label="Timp de asteptare"
          onChange={handleChange}
        >

          <MenuItem value={1}>15-30 min</MenuItem>
          <MenuItem value={2}>30-50 min</MenuItem>
          <MenuItem value={3}>60 min</MenuItem>
        </Select>
        </FormControl>

        <Button variant="outlined" onClick={clearFilters} className="del-filters-btn" >
          <div className="content-del-btn">
          <DeleteSweepIcon style={{ color: "#B8854C", height: '1em' }} />
           Șterge filtre
           </div>
        </Button>

    </Box>

      { 
        
         restaurants && restaurants.filter((restaurant)=> {
           if (search === "" && (filters.prices === "" && filters.cuisine === "" && filters.stars === "" && filters.waitingTime === "")){
             return restaurant
           }
          else if (search != "" && restaurant.name.toLowerCase().includes(search.toLowerCase())) {
            return restaurant
          }
          else if((filters.prices ==="" && filters.cuisine != "" && filters.waitingTime==="")  && filters.cuisine === restaurant.cuisine ){
            return restaurant
          }
          else if((filters.prices !="" && filters.cuisine === "" && filters.waitingTime==="" )  && filters.prices === restaurant.pricing ){
            return restaurant
          }
          else if((filters.prices ==="" && filters.cuisine === "" && filters.waitingTime !="")  && filters.waitingTime === restaurant.waitingTime ){
            return restaurant
          }
          else if((filters.prices !="" && filters.cuisine != "" && filters.waitingTime==="")  && filters.prices === restaurant.pricing && filters.cuisine === restaurant.cuisine ){
            return restaurant
          }
          else if((filters.prices ==="" && filters.cuisine != "" && filters.waitingTime !="") && filters.cuisine === restaurant.cuisine && filters.waitingTime === restaurant.waitingTime){
            return restaurant
          }
          else if((filters.prices !="" && filters.cuisine === "" && filters.waitingTime !="") && filters.prices === restaurant.pricing && filters.waitingTime === restaurant.waitingTime){
            return restaurant
          }
          else if((filters.prices !="" && filters.cuisine != "" && filters.waitingTime !="") && filters.prices === restaurant.pricing && filters.cuisine === restaurant.cuisine && filters.waitingTime === restaurant.waitingTime){
            return restaurant
          }
  
          
         }).map( (restaurant, index) => {
           return(
        <Card key={index} className="card-container" sx={{ display: 'flex', width: '80vw', height: '25vh', marginLeft:'8vw', marginTop:'5vh' }}>

          <CardActionArea to={`/restaurante/${restaurant.id}`} component={Link} sx={{ display: 'flex'}} >

      <Box className='menu-container'>
        <img className='menu-image' src={restaurant.profileImage ? restaurant.profileImage : restaurantImg} alt='menu image'/>
      </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30vw' }}>
        <CardContent sx={{ flex: '1 0 auto'}}>
          <Box className="name-stars">
            
          <Box>
          <Typography component="div" variant="h5">
            {restaurant.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {restaurant.location}
          </Typography>
          </Box>


          </Box>

          <Box className="descrieri">
            <img  className="small-icon" src={clock} alt="clock" />
            <Box> {restaurant.program} </Box>

            <div className="vertical-bar"/>
            <img  className="small-icon" src={chefHat} alt="hat" />
            <Box> {restaurantCuisine(restaurant)} </Box>
            <div className="vertical-bar"/>
            <img  className="small-icon" src={money} alt="money" />
            <Box> {restaurantPricing(restaurant)} </Box>
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
