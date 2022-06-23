import React, { useRef, useState, useEffect  } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import Carousel from 'react-material-ui-carousel'
import './DashboardRestaurant.css'
import { pdfjs,Document, Page } from 'react-pdf'
import Button from '@mui/material/Button';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';




pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

const { currentUser } = useAuth()
const [currentRestaurant, setCurrentRestaurants] = useState("")
const [restaurantDataOnce, setRestaurantDataOnce] = useState("")
const [style, setStyle] = useState([]); 
const [tables, setTables] = useState()
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);
const [sceneOutline, setSceneOutline] = useState(Array(18).fill(""))

const [ libraries ] = useState(['places']);
const mapContainerStyle = {
  width: "65vw",
  height: "60vh",
}

const {isLoaded, loadError} = useLoadScript({
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries,
});

const unsub = onSnapshot(doc(db, "ProfileRestaurant", currentUser.uid), (doc) => {
  setCurrentRestaurants(doc.data())

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


//--------------------------------scene display----------------------------------//

async function getOneElement() {
  await db.collection('ProfileRestaurant').doc(currentUser.uid).get()
  .then(snapshot => {setRestaurantDataOnce(snapshot.data())
                      console.log("heii", snapshot.data())
                      setStyle(snapshot.data().style)
                      setTables(snapshot.data().tables)
                      if(snapshot.data().sceneOutline){
                        setSceneOutline(snapshot.data().sceneOutline)
                      }
  })
}


 useEffect(() => {

   getOneElement()


}, []);

function placeDiv(e){
  console.log("x si y:", e.clientX, e.clientY)

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
  if(tables){
    return tables.map((item,index) => {

      return(
        <div key={index} id={index} className="table-btn" style={styleArr[index]} > 
        <p className="table-label"> Masa {index} </p>
        {displaySeats(index)}
        
        </div>
      )
    })
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


const newStyle = {position:"relative", left: 80+"px", top:40 +"px"}


  return (
    <div>
      <div className="description-container-dashRestaurant">

{currentRestaurant.gallery ? 
        <div className="carousel-and-details-dashRestaurant "> 
        <div className="carousel-container-dashRestaurant">  
        <Carousel className="carousel-dashRestaurant"
                  >
                  {
                    currentRestaurant.gallery?.map( (item, index) => <Gallery key={index} item={item} /> )
                  }
          </Carousel>
        </div>

        <div className="right-details-dashRestaurant">  

          <div className="dollar-alignment-dashRestaurant"> 
          <div className="name-details">
            <h2 className="restaurant-name"> {currentRestaurant.name} </h2>
            <div> {currentRestaurant.location} </div>
 
          </div>

          <div className="dollars-dashRestaurant"> {restaurantPricing(currentRestaurant)} </div>
          </div>

        </div>
        </div>
          : 
          <h2> Galerie </h2>
        }

        <div className="inline-icons-dashRestaurant">

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

        <div className="description-dashRestaurant">
          <h2>Descriere</h2>
          <p className="description-p"> {currentRestaurant.description}</p>
        </div>

        <div className="contact-dashRestaurant">
          <h2>Contact</h2>
          <div>Nr.tel: {currentRestaurant.phone}</div>
          <div>email: {currentRestaurant.email}</div>
        </div>

        <div id="restaurantScene" className="restaurant-scene-dashRestaurant">
          <h2 className="scene-label-dashRestaurant"> Asezare restaurant </h2>
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


        <div className="menu-display-dashRestaurant">
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
