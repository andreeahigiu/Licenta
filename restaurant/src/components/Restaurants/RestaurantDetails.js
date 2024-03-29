import React, { useState, useEffect  } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import './Restaurants.css'
import firebase from 'firebase/compat/app';

import Carousel from 'react-material-ui-carousel'
import Paper from '@mui/material/Paper';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import {Document, Page } from 'react-pdf'
import Button from '@mui/material/Button';

export default function RestaurantDetails(restaurantId) {
  const { id } = useParams();
  const { currentUser } = useAuth()
  const [currentRestaurant, setCurrentRestaurant] = useState("")
  const [style, setStyle] = useState([]); 
  const [tables, setTables] = useState()
  const history = useHistory();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [sceneOutline, setSceneOutline] = useState(Array(18).fill(""))

  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 765;

  const [ libraries ] = useState(['places']);
  const mapContainerStyle = {
    width: "65vw",
    height: "60vh",
  }

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  
  function previousPage() {
    changePage(-1);
  }
  
  function nextPage() {
    changePage(1);
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}

console.log("isMobile", isMobile)




  async function getOneElement() {
    await db.collection('ProfileRestaurant').doc(id).get()
    .then(snapshot => {setCurrentRestaurant(snapshot.data())
                        console.log("heii")
                        setStyle(snapshot.data().style)
                        setTables(snapshot.data().tables)
                        if(snapshot.data().sceneOutline)
                            {setSceneOutline(snapshot.data().sceneOutline)}

    })
  }
  
  //actualizez rezervarile; le sterg din daza de date pe acelea ale caror data si ora sunt mai vechi decat data si ora curenta 
  function updateBookings(){
    const currentDate = firebase.firestore.Timestamp.fromDate(new Date());

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
      });

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
    window.removeEventListener('resize', handleWindowSizeChange);
    }

  }, []);


  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading Maps";
  
  function placeDiv(e){
    console.log("x si y:", e.clientX, e.clientY)
  
  }
  
  function displaySeats(index){
    let tablesCpy = structuredClone(tables)
    if(tablesCpy[index].places === 2){
      return <React.Fragment>
        <div id="point2-1"/>
        <div id="point2-2"/>
      </React.Fragment>
    }

    if(tablesCpy[index].places === 4){
      return   <React.Fragment>
      <div id="point4-1"/>
      <div id="point4-2"/>
      <div id="point4-3"/>
      <div id="point4-4"/>
    </React.Fragment>
    }

    if(tablesCpy[index].places === 6){
      return   <React.Fragment>
      <div id="point6-1"/>
      <div id="point6-2"/>
      <div id="point6-3"/>
      <div id="point6-4"/>
      <div id="point6-5"/>
      <div id="point6-6"/>
    </React.Fragment>
    }

    if(tablesCpy[index].places === 8){
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
    if(tables){
      return tables.map((item,index) => {
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
            <img src={props.item.image} className="carousel-images" alt="carousel"></img>

        </Paper>
    )
}

function makeReservation() {
  if(currentUser){
    history.push(`/restaurante/${id}/rezervare`)
  }else{
    history.push(`/login`)
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

function restaurantCuisine(restaurant){
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

function restaurantWaitingTime(restaurant){
  if(restaurant.waitingTime === 1){
    return "15-30 min"
  }
  if(restaurant.waitingTime === 2){
    return "30-50 min"
  }
  if(restaurant.waitingTime === 3){
    return "60 min"
  }
}

  return (
    <div>
      <div className="description-container">

        <div className="carousel-and-details"> 
        <div className="carousel-container">  
        <Carousel className="carousel"
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
 
          </div>

          <div className="dollars"> {restaurantPricing(currentRestaurant)} </div>
          </div>

          <button className="book-now"  onClick={makeReservation}> Rezervă acum </button>  
        </div>
        </div>


        <div className="inline-icons">

        <div className="inline-icons-1">
          <div className="details-row">
          <div className="icon-detail-first"> Program </div>
          <div className="detail-1"> {currentRestaurant.program} </div>
          </div>

          <div className="details-row">
          <div className="icon-detail"> Bucătărie </div>
          <div className="detail-2"> {restaurantCuisine(currentRestaurant)} </div>
          </div>
          </div>

          <div className="inline-icons-2">
          <div className="details-row">
          <div className="icon-detail-second"> Decor </div>
          <div className="detail-3"> {currentRestaurant.decor} </div>
          </div>

          <div className="details-row">
          <div className="icon-detail"> Timp de așteptare </div>
          <div className="detail-4"> {restaurantWaitingTime(currentRestaurant)}</div>
          </div>
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

        <div id="restaurantScene" className="restaurant-scene">
          <h2 className="scene-label"> Asezare restaurant </h2>
            <div id="sceneContainer" className='scene-container' onClick = { e => placeDiv(e) }>
            
            <div className="scene-top">

<input readOnly id="0" defaultValue={sceneOutline[0]} className="input-style" />
<input readOnly id="1" defaultValue={sceneOutline[1]} className="input-style" />
<input readOnly id="2" defaultValue={sceneOutline[2]} className="input-style" />
<input readOnly id="3" defaultValue={sceneOutline[3]} className="input-style" />
<input readOnly id="4" defaultValue={sceneOutline[4]} className="input-style" />
</div>

<div className="scene-left-right"> 
<div className="scene-left">
<input readOnly id="5" defaultValue={sceneOutline[5]} type="text" className="input-style-vertical" />       
<input readOnly id="6" defaultValue={sceneOutline[6]} className="input-style-vertical" />
<input readOnly id="7" defaultValue={sceneOutline[7]} className="input-style-vertical" />
<input readOnly id="8" defaultValue={sceneOutline[8]} className="input-style-vertical" />


</div>

<div className="scene-right">
<input readOnly id="9" defaultValue={sceneOutline[9]} className="input-style-vertical" />
<input readOnly id="10" defaultValue={sceneOutline[10]} className="input-style-vertical" />
<input readOnly id="11" defaultValue={sceneOutline[11]} className="input-style-vertical" />
<input readOnly id="12" defaultValue={sceneOutline[12]} className="input-style-vertical" />

</div>
</div>

<div className="scene-bottom">
<input readOnly id="13" defaultValue={sceneOutline[13]} className="input-style" />
<input readOnly id="14" defaultValue={sceneOutline[14]} className="input-style" />
<input readOnly id="15" defaultValue={sceneOutline[15]} className="input-style" />
<input readOnly id="16" defaultValue={sceneOutline[16]} className="input-style" />
<input readOnly id="17" defaultValue={sceneOutline[17]} className="input-style" />
</div>
            
            
            {tableList()}
            </div>
        </div>

        <div className="location">
          <h2> Locație </h2>
          <div className="map-css"> 

            <GoogleMap className="map-mobile" mapContainerStyle={mapContainerStyle} zoom={15} center={{ lat: Number(currentRestaurant.latitude), lng: Number(currentRestaurant.longitude) }}>
        
            <Marker  position={{ lat: Number(currentRestaurant.latitude), lng: Number(currentRestaurant.longitude)}} />

            </GoogleMap>
          </div>
        </div>

        <div className="menu-display">
          <h2> Meniu </h2>
          <div className="menu-containerr">
            
          <Document file={currentRestaurant.menuImage} onLoadSuccess={onDocumentLoadSuccess}>
                      <Page className="menu-pages" pageNumber={pageNumber} />

          </Document>

          
          <div className="menu-page-control">

<Button type="button" disabled={pageNumber <= 1} onClick={previousPage} sx={{color:"rgb(184, 133, 76)" }} >
  Înapoi
</Button>
<p>
  Pagina {pageNumber || (numPages ? 1 : "--")} din {numPages || "--"}
</p>
<Button
  type="button"
  disabled={pageNumber >= numPages}
  onClick={nextPage}
  sx={{color:"rgb(184, 133, 76)" }} 
>
  Următorul
</Button>
</div>
</div>

        </div>

      </div>
    </div>
  )
}

