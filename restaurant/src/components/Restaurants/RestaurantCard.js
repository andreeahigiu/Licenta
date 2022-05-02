import React from 'react'
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

import { CardActionArea } from '@mui/material';


export default function RestaurantCard({restaurants}) {
    const theme = useTheme();
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"

    style={{ minHeight: '100vh'}}
   >
  
    <Grid item xs={3}>
      {
         restaurants && restaurants.map( restaurant => {
           return(
        <Card >
        <CardActionArea sx={{ display: 'flex', width: '100vw', maxWidth:'100%' }}>
        <CardMedia
        component="img"
        sx={{ width: 151, marginRight:'15vw' }}
        image={restaurant.menuImage}
        alt="Live from space album cover"
      />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
    </Card>


           )
         }
         )
    }


    </Grid>
    </Grid>
  )
}
