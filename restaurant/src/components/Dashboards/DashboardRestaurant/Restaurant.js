import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Carousel } from 'react-carousel-minimal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const captionStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
}
const slideNumberStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
}

let items=['Item 1','Item 2','Item 3','Item 4','Item 5', 'Item 6','Item 7','Item 8','Item 9','Item 10', 'Item 11','Item 12'];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Restaurant({updatedData}) {
  return (
    <div className='restaurant-container'>
      {console.log(updatedData)}

            <List>
                <ListItem>
                  <ListItemText>
                    Nume restaurant: {updatedData.name}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Locatie: {updatedData.location}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Numar locuri: {updatedData.places}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Telefon: {updatedData.phone}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Galerie: 
                    <Carousel
                      data={updatedData.photos}
                      time={2000}
                      width="60vw"
                      height="300px"
                      captionStyle={captionStyle}
                      radius="10px"
                      slideNumber={true}
                      slideNumberStyle={slideNumberStyle}
                      captionPosition="bottom"
                      automatic={true}
                      dots={true}
                      pauseIconColor="white"
                      pauseIconSize="40px"
                      slideBackgroundColor="darkgrey"
                      slideImageFit="cover"
                      thumbnails={true}
                      thumbnailWidth="100px"
                      style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                        margin: "40px auto",
                      }}
                      />
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <p> Meniu: </p>
                    <img className="menu-image" src={updatedData.menu} alt="Menu Image" /> 
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <p> Scena: </p>
                    <div className="scena"> 

                    <Grid container spacing={2}>
                    {items.map((item,index)=>{
                      return ( <Grid item xs={4}>
                              <Item>{item}</Item>
                              </Grid> )
                    })}
{/* 
                      <Grid item xs={8}>
                      <Item>xs=8</Item>
                      </Grid>

                      <Grid item xs={4}>
                      <Item>xs=4</Item>
                      </Grid>

                      <Grid item xs={4}>
                      <Item>xs=4</Item>
                      </Grid>

                      <Grid item xs={8}>
                      <Item>xs=8</Item>
                      </Grid> */}
                      </Grid>

                      
                    </div>
                  </ListItemText>
                </ListItem>

            </List>
      
    </div>
  )
}
