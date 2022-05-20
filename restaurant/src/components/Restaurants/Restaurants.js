import React, { useRef, useState, useEffect  } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import RestaurantCard from './RestaurantCard';



let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];

// export function checkLoading(){
//   return [isLoading, handleLoading]
// }

function Restaurants({updatedData}) {
  const [restaurants, setRestaurants] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [ids, setIds] = useState([])


  const unsub = onSnapshot(doc(db, "ProfileRestaurant", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
});



  useEffect(() => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
    
  console.log("mounted")
  db.collection('ProfileRestaurant')
    .get()
    .then( snapshot => {
      const restaurants = []
      snapshot.forEach( doc => {
        let data = doc.data()
        data.id = doc.id
        restaurants.push(data)

        ids.push( doc.id )
      })
      setRestaurants(restaurants)
      setIds(ids)
      setIsLoading(false)
      
    })
  }, []);

  console.log("restaurante:", restaurants)
  console.log("ids:", ids)
  return (
    <div className='restaurant'>
        {/* {items.map((item,index)=>{
            return <li key={index}>{item}</li>
        })} */}
      {isLoading && <div>Loading...</div>}
       <RestaurantCard restaurants={restaurants} />

    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("hei state:", state);
  return {
    // updatedData: state.firestore.ordered.ProfileRestaurant
    updatedData: state.updatedData.restaurantDetails
  }
}
// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([
//     { collection: 'ProfileRestaurant' }
//   ])
// )(Restaurants)
export default connect(mapStateToProps)(Restaurants)