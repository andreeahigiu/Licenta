import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Restaurants.css'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './Restaurants.css'
import CardMedia from '@mui/material/CardMedia';

export default function ReviewCard() {
  return (
    <div>
      <Card sx={{ maxWidth: "80vw" }}>
        <Box className="review-top">
        <CardMedia
        component="img"
        height="40"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />

      <div> 
        <div className="review-user"> Username</div>
        <div> 3/5 stars</div>
      </div>

      <div> acum 3 zile </div>


        </Box>

        <Box className="review-bottom">


        </Box>
     
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
  )
}
