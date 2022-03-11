import React from 'react'
let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];

export default function Restaurants() {
  return (
    <div className='restaurant'>
        <ul>
        {items.map((item,index)=>{
            return <li key={index}>{item}</li>
        })}
        </ul>
      
    </div>
  )
}
