import React, { useRef, useState, useEffect  } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import ReviewCard from './ReviewCard'

export default function RestaurantDetails(restaurantId) {
  const { id } = useParams();
  const { currentUser } = useAuth()
  const [currentRestaurant, setCurrentRestaurants] = useState("")
  const [restaurantDataOnce, setRestaurantDataOnce] = useState("")
  const [style, setStyle] = useState([]); 
  const [tables, setTables] = useState()
  const history = useHistory();


  console.log("id restaurantTT:", id)
  async function getOneElement() {
    await db.collection('ProfileRestaurant').doc(id).get()
    .then(snapshot => {setRestaurantDataOnce(snapshot.data())
                        console.log("heii")
                        setStyle(snapshot.data().style)
                        setTables(snapshot.data().tables)
    })
  }
  
  
   useEffect(() => {
  
     getOneElement()

      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });

  
  }, []);
  
  function placeDiv(e){
    console.log("x si y:", e.clientX, e.clientY)
  
  }
  
  function handleClick(){
    history.push(`/restaurante/${id}/rezervare`);
  }
  
  function tableList(){
    let styleArr = style
    //console.log("Style array", styleArr)
    if(tables){
      return tables.map((item,index) => {
        //console.log("table style:", styleArr[index])
        // setStyle( styles=> [...styles, newStyle] )
        return(
          <div id={index} className="table-btn" style={styleArr[index]} > Masa noua{index} </div>
        )
      })
    }
  

  
  }

  return (
    <div>
      <div className="top-part">
        <button className="back"> Back to list </button>
        <button className="book-now"> Book bow </button>
      </div>
      <div classname="content-part">
        <div> Gallery </div>
        <div className="under-gallery">
          <div className="name-details">
            nume
            Locatie
            stele(review)
          </div>
          <div> $$$ </div>
        </div>

        <div className="inline-icons">
          <div> Program </div>
          <div> Bucatarie </div>
          <div> Decor </div>
          <div> Timp de asteptare </div>
        </div>

        <div className="description">
          <h2>Descriere</h2>
          <p>lalaalalallallaaaaaaaaaaaaaaaaaaaaaaljkfhjk fhjsbgjjjjjj</p>
        </div>

        <div className="contact">
          <h2>Contact</h2>
          <div>Nr.tel: 07556332555</div>
          <div>email: lala@yahoo.com</div>
        </div>

        <div className="restaurant-scene">
          <h2> Asezare restaurant </h2>
            <div id="sceneContainer" className='scene-container' onClick = { e => placeDiv(e) }>
            {tableList()}
            </div>
        </div>

        <div className="location">
          <h2> Locatie </h2>
          <div> ---Harta---</div>
        </div>

        <div className="reviews-container">
          <ReviewCard />

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