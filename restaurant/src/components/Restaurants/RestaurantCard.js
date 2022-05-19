import React, { useEffect } from 'react'
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import './Restaurants.css'
import Grid from '@material-ui/core/Grid';
import RestaurantDetails from './RestaurantDetails';

import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';



export default function RestaurantCard({restaurants}) {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      restaurants && setIsLoading(false)
      console.log('In effect:', isLoading)
    }, [])


  return (

    <Grid
    container
    spacing={0}
    direction="column"
    // alignItems="center"
    // justifyContent="center"

    style={{ minHeight: '100vh', marginBottom:'25vh'}}
   >

    <Grid item xs={3}>
      { 
        
         restaurants && restaurants.map( restaurant => {

           return(
        <Card sx={{ display: 'flex', width: '80vw', height: '25vh', marginLeft:'8vw', marginTop:'5vh' }}>
          {/* {setIsLoading(false)} */}
          {/* <Link to={`/restaurante/${restaurant.name}`}> */}
          <CardActionArea to={`/restaurante/${restaurant.id}`} component={Link} sx={{ display: 'flex'}} >
            {/* <CardMedia
        component="img"
        sx={{ width: 151, marginRight:'15vw', margin:'15px', maxHeight:'100%', maxWidth:'100%', objectFit: 'contain'}}
        image={restaurant.menuImage}
        alt="Live from space album cover"
      /> */}
      <Box className='menu-container'>
        <img className='menu-image' src={restaurant.menuImage} alt='menu image'/>
      </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30vw' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {restaurant.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {restaurant.location}
          </Typography>
        </CardContent>
        
      </Box>
      </CardActionArea>
      {/* </Link> */}
    </Card>


           )
         }
         )
    }



    </Grid>
    </Grid>
  )
}
