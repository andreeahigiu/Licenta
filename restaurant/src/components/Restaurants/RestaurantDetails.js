import React, { useRef, useState, useEffect  } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';

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
      {console.log("In Component:", restaurantId)}
      <p> Scena: </p>
        <div id="sceneContainer" className='scene-container' onClick = { e => placeDiv(e) }> 

        {tableList()}
                    
        </div>
        <button onClick={ handleClick } type="button"> Rezerva acum! </button>
        
      <h2> Restaurant Details id: {id} </h2>
    </div>
  )
}
