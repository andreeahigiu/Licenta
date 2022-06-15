import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ContentCutOutlined } from '@mui/icons-material';

export default function MyBookings(props) {

    const [ clientDetails, setClientDetails] = useState(props.clientDetails)

    // useEffect(() => {
    // setClientDetails(props.clientDetails)
    // }, [])
console.log("detaliile rezervarilor:", clientDetails)
    function displayBookings(){
//clientDetails.myBookings.slice(0).reverse().map((item,index) =>

        if(clientDetails != undefined && clientDetails.myBookings.length > 1){
           return clientDetails.myBookings.slice(0).reverse().map((item,index) => { 
                return(
                    <Card sx={{ height: "23vh" , width: "40vw", marginBottom: "5vh"}}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      Rezervare din data: {item.date.toDate().toLocaleDateString()}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Ora: { item.date.toDate().getHours() + ':' + (item.date.toDate().getMinutes()<10?'0':'') + item.date.toDate().getMinutes() }
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Rezervata pentru: { item.bookedFor + " " + "ore" } 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Nr. masa rezervata: { item.tableNr} 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Id rezervare: { item.bookingId  } 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Id masa rezervata: { item.tableId  } 
                      </Typography>
                    </CardContent>
                    {/* <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions> */}
                  </Card>
              
                )
            })}
            else{
              return(
                <Card sx={{ height: "23vh" , width: "40vw", marginBottom: "5vh"}}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      Nu aveti nicio rezervare
                      </Typography>

                    </CardContent>
                    {/* <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions> */}
                  </Card>
              )
            }
          }
    


  return (
      <div className="mybookings-container"> 

    {displayBookings()}
   
    </div>
  );
}
