import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Carousel } from 'react-carousel-minimal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const data = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
    caption: "San Francisco"
  },
  {
    image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
    caption: "Scotland"
  },
  {
    image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
    caption: "Darjeeling"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
    caption: "San Francisco"
  },
  {
    image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
    caption: "Scotland"
  },
  {
    image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
    caption: "Darjeeling"
  },
  {
    image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
    caption: "San Francisco"
  },
  {
    image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
    caption: "Scotland"
  },
  {
    image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
    caption: "Darjeeling"
  }
];

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


export default function Restaurant() {
  return (
    <div className='restaurant-container'>

            <List>
                <ListItem>
                  <ListItemText>
                    Nume restaurant: 
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Locatie: 
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Poze: 
                    <Carousel
                      data={data}
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
                    <img className="menu-image" src="https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx" alt="Menu Image" /> 
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
