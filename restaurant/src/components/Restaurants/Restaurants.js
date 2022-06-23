import React, { useRef, useState, useEffect  } from 'react'
import { connect } from 'react-redux';
import { db } from '../../firebase';
import RestaurantCard from './RestaurantCard';
import './Restaurants.css'


function Restaurants({updatedData}) {
  const [restaurants, setRestaurants] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [ids, setIds] = useState([])


  useEffect(() => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });


  db.collection('ProfileRestaurant')
    .get()
    .then( snapshot => {
      const restaurantsArr = []
      snapshot.forEach( doc => {
        let data = doc.data()
        data.id = doc.id
        restaurantsArr.push(data)

        ids.push( doc.id )
      })
      setRestaurants(restaurantsArr)
      setIds(ids)
      setIsLoading(false)
      
    })
  }, []);


  return (
    <div className='restaurant'>
       {isLoading && <div className="is-loading"> Loading... </div>}
       <RestaurantCard restaurants={restaurants} />

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    updatedData: state.updatedData.restaurantDetails
  }
}

export default connect(mapStateToProps)(Restaurants)