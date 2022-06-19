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
const [restaurantDataOnce, setRestaurantDataOnce] = useState("")
const [style, setStyle] = useState([]); 
const [tables, setTables] = useState()
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);

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
  //console.log("Current data: ", doc.data());
  //currentRestaurant.push(doc.data());
  setCurrentRestaurants(doc.data())
  // setStyle(doc.data().style)
  // setTables(doc.data().tables)
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
// console.log("Data in state:", currentRestaurant);

//let pics = currentRestaurant.gallery
//console.log("gallery:", pics)

//--------------------------------scene display----------------------------------//

async function getOneElement() {
  await db.collection('ProfileRestaurant').doc(currentUser.uid).get()
  .then(snapshot => {setRestaurantDataOnce(snapshot.data())
                      console.log("heii")
                      setStyle(snapshot.data().style)
                      setTables(snapshot.data().tables)
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
  //console.log("Style array", styleArr)
  if(tables){
    return tables.map((item,index) => {
      //console.log("table style:", styleArr[index])
      // setStyle( styles=> [...styles, newStyle] )
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


// let elem = document.querySelector('#sceneContainer');
// let rect = elem.getBoundingClientRect();
const newStyle = {position:"relative", left: 80+"px", top:40 +"px"}
//console.log("newstyle:", newStyle)
//console.log("container coordinates: ",rect.top, rect.right, rect.bottom, rect.left);

  return (
    <div>
      {/* <div className="top-part">
        <button className="back"> 
        <img  className="back-icon" src={back} alt="back" />
        <p className="back-text"> Înapoi </p>
        </button>

      </div> */}
      <div className="description-container-dashRestaurant">

        <div className="carousel-and-details-dashRestaurant "> 
        <div className="carousel-container-dashRestaurant">  
        <Carousel className="carousel-dashRestaurant"
                  //next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
                  //prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
                  >
                  {
                    currentRestaurant.gallery?.map( (item, index) => <Gallery key={index} item={item} /> )
                  }
          </Carousel>
        </div>

        <div className="right-details-dashRestaurant">  

          <div className="dollar-alignment-dashRestaurant"> 
          <div className="name-details">
            <h2> {currentRestaurant.name} </h2>
            <div> {currentRestaurant.location} </div>
 
          </div>

          <div className="dollars-dashRestaurant"> {restaurantPricing(currentRestaurant)} </div>
          </div>

        </div>
        </div>


        <div className="inline-icons-dashRestaurant">

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
            {tableList()}
            </div>
        </div>


        <div className="menu-display-dashRestaurant">
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
//     <div className='restaurant-container'>
//       {/* {console.log(updatedData)} */}

//             <List>
//                 <ListItem>
//                   <ListItemText>
//                     Nume restaurant: {currentRestaurant.name}
//                   </ListItemText>
//                 </ListItem>

//                 <ListItem>
//                   <ListItemText>
//                     Locatie: {currentRestaurant.location}
//                   </ListItemText>
//                 </ListItem>

//                 <ListItem>
//                   <ListItemText>
//                     Numar locuri: {currentRestaurant.places}
//                   </ListItemText>
//                 </ListItem>

//                 <ListItem>
//                   <ListItemText>
//                     Telefon: {currentRestaurant.phone}
//                   </ListItemText>
//                 </ListItem>
// {/* {console.log("gallery: ", currentRestaurant.gallery)} */}
// {/* {console.log("gallery2: ", updatedData.photos)} */}
//              {/* {currentRestaurant.gallery?.map((item, index) => (
//              <div>  
//             {index}
//              <img src={item.image}/> 
//             </div>)) }  */}
//             <ListItem
//             sx={{
//               zIndex: 0,
//             }}>
//                   <ListItemText>
//                   <p> Galerie foto: </p>
//                   <Carousel 
//                   //next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
//                   //prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
//                   >
//                   {
//                     currentRestaurant.gallery?.map( (item, index) => <Gallery key={index} item={item} /> )
//                   }
//                   </Carousel>

//                   </ListItemText>
//             </ListItem>

//                 <ListItem>
//                   <ListItemText>
//                     <p> Meniu: </p>
//                     {/* <img className="menu-image-dash" src={currentRestaurant.menuImage} alt="Menu Image"/>  */}
//                     <Document file={currentRestaurant.menuImage} onLoadSuccess={onDocumentLoadSuccess}>
//                       <Page className="pdf-pages" pageNumber={pageNumber} />
//                       {/* {Array.apply(null, Array(numPages))
//                         .map((x, i)=>i+1)
//                         .map(page => <Page pageNumber={page}/>)} */}
//                     </Document>

//                   <div className="pdf-page-control">

//         <Button type="button" disabled={pageNumber <= 1} onClick={previousPage} sx={{color:"rgb(184, 133, 76)" }} >
//           Previous
//         </Button>
//         <p>
//           Pagina {pageNumber || (numPages ? 1 : "--")} din {numPages || "--"}
//         </p>
//         <Button
//           type="button"
//           disabled={pageNumber >= numPages}
//           onClick={nextPage}
//           sx={{color:"rgb(184, 133, 76)" }} 
//         >
//           Next
//         </Button>
//       </div>


//                   </ListItemText>
//                 </ListItem> 
//                 {/* {console.log("well nopw:", currentRestaurant.menuImage)} */}

//                 <ListItem>
//                   <ListItemText>
//                     <p> Scena: </p>
//                     <div id="sceneContainer" className='scene-container' onClick = { e => placeDiv(e) }> 

//                     {tableList()}
//                     {/* <div style={newStyle} className="test-div">test</div> */}
                    
//                     </div>


//                   </ListItemText>
//                 </ListItem>
                
//             </List>

//             {/* <div className="test-div">test</div> */}
//     </div>
  )
}
