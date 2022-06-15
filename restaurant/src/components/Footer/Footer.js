import React from 'react'
import "./Footer.css"

export default function Footer() {
  return (
    <div className="footer-container">
        <div className="logo-motto-section">
            <div>
            <div>Logo</div>
            <div> Motto </div>
            <div>@2022 Gustărești</div>
            </div> 
        </div>
        
        <div className="explore-section"> 
        <div>
            <h3>Explorează</h3>
            <div> Acasă </div>
            <div> Restaurante </div>
            <div> Despre </div>
            <div> Contact </div>
        </div>
        </div>

        <div className="socials-section">
        <div>
            <h3>Ne poti gasi pe: </h3>
            <div> Facebook </div>
            <div> Instagram </div>
            <div> gustaresti@gmail.com</div>
        </div>
        </div>
    </div>
  )
}
