import React, { useRef, useState, useEffect  } from 'react'
import { useParams } from 'react-router-dom';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import ReviewCard from './ReviewCard'
import back from '../../utils/icons/back-arrow.svg' 
import star from '../../utils/icons/star-svgrepo-com.svg' 
import './Restaurants.css'
//import { Firestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

import Carousel from 'react-material-ui-carousel'
import Paper from '@mui/material/Paper';
import { Link } from '@mui/material';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

export default function RestaurantDetails(restaurantId) {
  const { id } = useParams();
  const { currentUser } = useAuth()
  const [currentRestaurant, setCurrentRestaurant] = useState("")
  const [restaurantDataOnce, setRestaurantDataOnce] = useState("")
  const [style, setStyle] = useState([]); 
  const [tables, setTables] = useState()
  const history = useHistory();

  const libraries = ['places']
  const mapContainerStyle = {
    width: "50vw",
    height: "50vh",

  }
  const center = {
    lat: 47.158455,
    lng: 27.601442,

  }
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });


  console.log("id restaurant:", id)
  async function getOneElement() {
    await db.collection('ProfileRestaurant').doc(id).get()
    .then(snapshot => {setCurrentRestaurant(snapshot.data())
                        console.log("heii")
                        setStyle(snapshot.data().style)
                        setTables(snapshot.data().tables)
    })
  }
  
  //actualizez rezervarile; le sterg din daza de date pe acelea ale caror data si ora sunt mai vechi decat data si ora curenta 
  function updateBookings(){
    const currentDate = firebase.firestore.Timestamp.fromDate(new Date());
    console.log("data curenta:", currentDate)

    db.collection('Bookings').doc(id).collection('BookingList').where("date","<", currentDate)
    .get()
    .then( function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log("DOC EXPIRAT",doc.id," => ",doc.data().date.toDate(), doc.data().bookingId);
        doc.ref.delete();
      });
    })
    .catch(function(error){
      console.log("Error at getting documents", error)
    })
    console.log("Finalul cautarii de Doc Expirate:")
  }

   useEffect(() => {
  
     getOneElement()
     updateBookings()

      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });


  }, []);


  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading Maps";
  
  function placeDiv(e){
    console.log("x si y:", e.clientX, e.clientY)
  
  }
  
  function handleClick(){
    history.push(`/restaurante/${id}/rezervare`);
  }

  function displaySeats(index){
    let tablesCpy = structuredClone(tables)
    if(tablesCpy[index].places == 2){
      return <React.Fragment>
        <div id="point2-1"/>
        <div id="point2-2"/>
      </React.Fragment>
    }

    if(tablesCpy[index].places == 4){
      return   <React.Fragment>
      <div id="point4-1"/>
      <div id="point4-2"/>
      <div id="point4-3"/>
      <div id="point4-4"/>
    </React.Fragment>
    }

    if(tablesCpy[index].places == 6){
      return   <React.Fragment>
      <div id="point6-1"/>
      <div id="point6-2"/>
      <div id="point6-3"/>
      <div id="point6-4"/>
      <div id="point6-5"/>
      <div id="point6-6"/>
    </React.Fragment>
    }

    if(tablesCpy[index].places == 8){
      return <React.Fragment>
      <div id="point8-1"/>
      <div id="point8-2"/>
      <div id="point8-3"/>
      <div id="point8-4"/>
      <div id="point8-5"/>
      <div id="point8-6"/>
      <div id="point8-7"/>
      <div id="point8-8"/>
    </React.Fragment>
    }
  }
  
  function tableList(){
    let styleArr = style
    //console.log("Style array", styleArr)
    if(tables){
      return tables.map((item,index) => {
        //console.log("table style:", styleArr[index])
        // setStyle( styles=> [...styles, newStyle] )
        return(
          <div key={index} id={index} className="table-btn" style={styleArr[index]} > 
          Masa {index} 
          {displaySeats(index)}
          </div>
        )
      })
    }

  }

  function Gallery(props)
{
    return (
        <Paper>
            {/* <h2>{props.item.caption}</h2> */}
            {/* <p>{props.item.description}</p> */}
            <img src={props.item.image} className="carousel-images"></img>

        </Paper>
    )
}

function makeReservation() {
  history.push(`/restaurante/${id}/rezervare`)
}

function restaurantPricing(restaurant){
  if(restaurant.pricing == 1){
    return "$"
  }
  if(restaurant.pricing == 2){
    return "$$"
  }
  if(restaurant.pricing == 3){
    return "$$$"
  }
  if(restaurant.pricing == 4){
    return "$$$$"
  }
}

function restaurantCuisine(restaurant){
  if(restaurant.cuisine == 1){
    return "Americana"
  }
  if(restaurant.cuisine == 2){
    return "Asiatica"
  }
  if(restaurant.cuisine == 3){
    return "Europeana"
  }
  if(restaurant.cuisine == 4){
    return "Italiana"
  }
  if(restaurant.cuisine == 5){
    return "Romaneasca"
  }

}

function restaurantWaitingTime(restaurant){
  if(restaurant.waitingTime == 1){
    return "15-30 min"
  }
  if(restaurant.waitingTime == 2){
    return "30-50 min"
  }
  if(restaurant.waitingTime == 3){
    return "60 min"
  }
}

  return (
    <div>
      <div className="top-part">
        <button className="back"> 
        <img  className="back-icon" src={back} alt="back" />
        <p className="back-text"> Înapoi </p>
        </button>

      </div>
      <div className="description-container">

        <div className="carousel-and-details"> 
        <div className="carousel-container">  
        <Carousel className="carousel"
                  //next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
                  //prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
                  >
                  {
                    currentRestaurant.gallery?.map( (item, index) => <Gallery key={index} item={item} /> )
                  }
          </Carousel>
        </div>

        <div className="right-details">  

          <div className="dollar-alignment"> 
          <div className="name-details">
            <h2> {currentRestaurant.name} </h2>
            <div> {currentRestaurant.location} </div>
            <div> 3/5<img  className="star-icon" src={star} alt="star" /> ( <Link> 120 reviews </Link>)</div> 

            
            
          </div>

          <div className="dollars"> {restaurantPricing(currentRestaurant)} </div>
          </div>

          <button className="book-now"  onClick={makeReservation}> Rezervă acum </button>  
        </div>
        </div>


        <div className="inline-icons">
          <div className="inline-first">
          <div className="icon-detail-first"> Program </div>
          <div className="icon-detail"> Bucatarie </div>
          <div className="icon-detail"> Decor </div>
          <div className="icon-detail"> Timp de asteptare </div>
          </div>

          <div className="inline-second">
          <div className="detail-1"> {currentRestaurant.program} </div>
          <div className="detail-2"> {restaurantCuisine(currentRestaurant)} </div>
          <div className="detail-3"> {currentRestaurant.decor} </div>
          <div className="detail-4"> {restaurantWaitingTime(currentRestaurant)}</div>
          </div>
        </div>

        <div className="description">
          <h2>Descriere</h2>
          <p className="description-p"> {currentRestaurant.description}</p>
        </div>

        <div className="contact">
          <h2>Contact</h2>
          <div>Nr.tel: {currentRestaurant.phone}</div>
          <div>email: {currentRestaurant.email}</div>
        </div>

        <div className="restaurant-scene">
          <h2> Asezare restaurant </h2>
            <div id="sceneContainer" className='scene-container' onClick = { e => placeDiv(e) }>
            {tableList()}
            </div>
        </div>

        <div className="location">
          <h2> Locatie </h2>
          <div className="map-css"> 

            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={{ lat: Number(currentRestaurant.latitude), lng: Number(currentRestaurant.longitude) }}>
            
            {/* {console.log("latitudine: ", currentRestaurant.latitude)} */}

            <Marker  position={{ lat: Number(currentRestaurant.latitude), lng: Number(currentRestaurant.longitude)}} />

            </GoogleMap>
          </div>
        </div>

        <div className="reviews-container">
          <div className="reviews-1">
          <h2> Reviews </h2>
          <button className="review-btn">Adauga un review</button>
          </div>


          <div className="review-card"> 
          <ReviewCard  />
          </div>

        </div>
      </div>
    </div>
  )
}





      {/* {console.log("In Component:", restaurantId)}
      <p> Scena: </p>
        <div id="sceneContainer" className='scene-container' onClick = { e => placeDiv(e) }> 

        {tableList()}
                    
        </div>
        <button onClick={ handleClick } type="button"> Rezerva acum! </button>
        
      <h2> Restaurant Details id: {id} </h2> */}