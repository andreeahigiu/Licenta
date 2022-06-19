import React from 'react'
import dog from '../../utils/images/404-dog.png' 
import "./PageNotFound.css"

export default function PageNotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-text">
        <p className="announcement"> 404 </p>
        <p className="description-problem">Pagina accesată nu a putut fi găsită</p>
      </div>
      <div className="notfound-img-container">
        <img className="notfound-img" src={dog} alt={dog}/>
      </div>
    </div>
  )
}
