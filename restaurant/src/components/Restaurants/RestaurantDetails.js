import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

export default function RestaurantDetails(restaurantId) {
  const { id } = useParams();

  return (
    <div>
      {console.log("In Component:", restaurantId)}

      <h2> Restaurant Details id: {id} </h2>
    </div>
  )
}
