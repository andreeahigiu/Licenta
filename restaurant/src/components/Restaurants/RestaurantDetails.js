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
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 765;

  const libraries = ['places']
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
      {/* <div className="top-part">
        <button className="back"> 
        <img  className="back-icon" src={back} alt="back" />
        <p className="back-text"> Înapoi </p>
        </button>

      </div> */}
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
          <div className="icon-detail"> Bucatarie </div>
          <div className="detail-2"> {restaurantCuisine(currentRestaurant)} </div>
          </div>
          </div>

          <div className="inline-icons-2">
          <div className="details-row">
          <div className="icon-detail-second"> Decor </div>
          <div className="detail-3"> {currentRestaurant.decor} </div>
          </div>

          <div className="details-row">
          <div className="icon-detail"> Timp de asteptare </div>
          <div className="detail-4"> {restaurantWaitingTime(currentRestaurant)}</div>
          </div>
          </div>


          {/* <div className="inline-first">
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
          </div> */}
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
            {tableList()}
            </div>
        </div>

        <div className="location">
          <h2> Locatie </h2>
          <div className="map-css"> 

            <GoogleMap className="map-mobile" mapContainerStyle={mapContainerStyle} zoom={15} center={{ lat: Number(currentRestaurant.latitude), lng: Number(currentRestaurant.longitude) }}>
            
            {/* {console.log("latitudine: ", currentRestaurant.latitude)} */}

            <Marker  position={{ lat: Number(currentRestaurant.latitude), lng: Number(currentRestaurant.longitude)}} />

            </GoogleMap>
          </div>
        </div>

        <div className="menu-display">
          <h2> Meniu </h2>
          <div className="menu-containerr">
            
          <Document file={currentRestaurant.menuImage} onLoadSuccess={onDocumentLoadSuccess}>
                      <Page className="menu-pages" pageNumber={pageNumber} />
                      {/* {Array.apply(null, Array(numPages))
                        .map((x, i)=>i+1)
                        .map(page => <Page pageNumber={page}/>)} */}
          </Document>

          
          <div className="menu-page-control">

<Button type="button" disabled={pageNumber <= 1} onClick={previousPage} sx={{color:"rgb(184, 133, 76)" }} >
  Previous
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
  Next
</Button>
</div>
</div>

        </div>

      </div>
    </div>
  )
}

