import React from 'react'
import "./About.css"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CircleIcon from '@mui/icons-material/Circle';
import wine from '../../utils/images/wine.svg' 
import choose from '../../utils/images/chooseMeal.svg' 
import meal from '../../utils/images/mealTogether.svg' 
import chef from '../../utils/images/chef.svg' 
import orders from '../../utils/images/restaurantOrders.svg' 
import background from '../../utils/images/aboutImg.jpg' 


export default function About() {

  function gotoBottomSection(){

  }

  return (
    <div className="about-container">
      <div className="top-container">

<div className="title-and-image-container">

        <div className="img-about-container">
        <img className="img-about" src={background} alt={"about"}/>
        </div>

        <div className="about-title-container">
        <div className="about-title">Gustărești</div>
        <div className="about-subtitle">Aplicația care îți rezervă cele mai minunate momente!</div>
        
        
        <div className="see-how-it-works">    
        <a href="#bottom" style={{ textDecoration:"none"}}>
          <p className="how-it-works-text">Vezi cum functioneaza</p>
          
          <div className="down-arrow" onClick={gotoBottomSection}>
            <KeyboardDoubleArrowDownIcon/>
          </div>
        </a>
        </div>
        </div>



</div>
        

      </div>
      <div id="bottom" className="bottom-container">
        <div className="client-account">
          <div className="client-title">Client</div>

          <div className="step-point">
            <CircleIcon fontSize='small' className="bullet"/>
            <p className="point-text">Crează-ți un cont de tip client în aplicație și intră în comunitatea Gustărești.</p>
          </div>

          <div className="step-icon-point">

            <div className="image-container"> 
              <img className="point-img" src={wine} alt={"man holding wine"}/>
            </div>

            <div >
            <p className="point-text-img">Conectează-te și actualizează-ți datele profilului.</p>
            </div>

          </div>

          <div className="step-point">
            <CircleIcon fontSize='small' className="bullet"/>
            <p className="point-text">Intră în secțiunea de Restaurante și caută o locație după preferințele tale</p>
          </div>

          <div className="step-icon-point">

          <p className="point-text-img-1">Alege unul dintre restaurantele înscrise în aplicație și vizualizează-i detaliile amănunțite cu doar un click.</p>

            <div className="image-container"> 
              <img className="point-img" src={choose} alt={"man holding wine"}/>
            </div>

          </div>

          <div className="step-point">
            <CircleIcon fontSize='small' className="bullet"/>
            <p className="point-text">Dacă ești mulțumit de alegerea făcută, apasă butonul de „Rezervă acum” și inițiază rezervarea.</p>
          </div>

          
          <div className="step-icon-point">
            <div className="image-container"> 
              <img className="point-img" src={meal} alt={"man holding wine"}/>
            </div>
            <div >
            <p className="point-text-img">Selectează datele rezervării și masa dorită, în funcție de scena fiecărui restaurant și finalizează rezervarea.</p>
            </div>

          </div>

          <div className="step-point">
            <CircleIcon fontSize='small' className="bullet"/>
            <p className="point-text">Vezi toate rezervările efectuate în pagina de Profil și bucură-te de experiența Gustărești.</p>
          </div>

        </div>

        <div className="restaurant-account">

        <div className="restaurants-title">Restaurant</div>

<div className="step-point">
  <CircleIcon fontSize='small' className="bullet"/>
  <p className="point-text">Crează-ți un cont de tip restaurant în aplicație și intră în comunitatea Gustărești.</p>
</div>

<div className="step-point">
  <CircleIcon fontSize='small' className="bullet"/>
  <p className="point-text">Conectează-te și actualizează-ți datele profilului pentru ca utilizatorii să poată afla totul despre restaurantul tău.</p>
</div>

<div className="step-icon-point">

  <div className="image-container"> 
    <img className="point-img" src={chef} alt={"man holding wine"}/>
  </div>

  <div >
  <p className="point-text-img">Personalizează scena restaurantului și oferă-le clienților o idee legată de poziționarea meselor.</p>
  </div>

</div>

<div className="step-point">
  <CircleIcon fontSize='small' className="bullet"/>
  <p className="point-text">Monitorizează rezervările la restaurantul tău prin doar câteva click-uri.</p>
</div>

<div className="step-icon-point">

<p className="point-text-img-1">Poți actualiza oricând detaliile restaurantului sau scena din pagina de Profil.</p>

  <div className="image-container"> 
    <img className="point-img" src={orders} alt={"man holding wine"}/>
  </div>

</div>

<div className="step-point">
  <CircleIcon fontSize='small' className="bullet"/>
  <p className="point-text">Adaugă un meniu pentru a le trezi apetitul clienților.</p>
</div>

        </div>
      </div>
    </div>
  )
}
