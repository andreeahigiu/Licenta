import React, { useRef, useState, useEffect  } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import { Carousel } from 'react-carousel-minimal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import Carousel from 'react-material-ui-carousel'


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

function Gallery(props)
{
    return (
        <Paper>
            <h2>{props.item.caption}</h2>
            {/* <p>{props.item.description}</p> */}
            <img src={props.item.image} width="500" height="600"></img>

        </Paper>
    )
}

export default function Restaurant({updatedData}) {

  
// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

const { currentUser } = useAuth()
const [currentRestaurant, setCurrentRestaurants] = useState("")

const unsub = onSnapshot(doc(db, "ProfileRestaurant", currentUser.uid), (doc) => {
  //console.log("Current data: ", doc.data());
  //currentRestaurant.push(doc.data());
  setCurrentRestaurants(doc.data())
});
// console.log("Data in state:", currentRestaurant);

//let pics = currentRestaurant.gallery
//console.log("gallery:", pics)


  return (
    <div className='restaurant-container'>
      {/* {console.log(updatedData)} */}

            <List>
                <ListItem>
                  <ListItemText>
                    Nume restaurant: {currentRestaurant.name}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Locatie: {currentRestaurant.location}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Numar locuri: {currentRestaurant.places}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    Telefon: {currentRestaurant.phone}
                  </ListItemText>
                </ListItem>
{/* {console.log("gallery: ", currentRestaurant.gallery)} */}
{/* {console.log("gallery2: ", updatedData.photos)} */}
             {/* {currentRestaurant.gallery?.map((item, index) => (
             <div>  
            {index}
             <img src={item.image}/> 
            </div>)) }  */}
            <ListItem
            sx={{
              zIndex: 0,
            }}>
                  <ListItemText>
                  <p> Galerie foto: </p>
                  <Carousel 
                  //next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
                  //prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
                  >
                  {
                    currentRestaurant.gallery?.map( (item, index) => <Gallery key={index} item={item} /> )
                  }
                  </Carousel>

                  </ListItemText>
            </ListItem>

                  {/* <ListItem> 
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
                </ListItem> */}

                <ListItem>
                  <ListItemText>
                    <p> Meniu: </p>
                    <img className="menu-image" src={currentRestaurant.menuImage} alt="Menu Image" /> 
                  </ListItemText>
                </ListItem> 
                {/* {console.log("well nopw:", currentRestaurant.menuImage)} */}

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
