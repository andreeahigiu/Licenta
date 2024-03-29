import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom';
import logo from '../../utils/images/logo-white-big.png' 

export default function Footer() {
  return (
    <div className="footer-container">
        <div className="logo-motto-section">
            <div className="logo-motto-div">
            <div >
            <img className="logo-img-footer" src={logo} alt={"logo"} />
            </div>
            <div className="motto-container"> 
              Rezervăm cele mai frumoase momente pentru tine.
            </div>

            </div> 
        </div>
        <div className="rights">
            <p>@2022 Gustărești</p>
        </div>
        
        <div className="explore-section"> 
        <div>
            <h3>Explorează</h3>
            <div>
             <Link to="" className="link-style"> 
                  Acasă 
             </Link> 
             </div>

            <div>
             <Link to="restaurante" className="link-style"> 
                 Restaurante 
             </Link> 
             </div>

             <div>
             <Link to="about" className="link-style"> 
                 Despre noi
             </Link> 
             </div>

             <div>
             <Link to="contact" className="link-style"> 
                 Contact
             </Link> 
             </div>
        </div>
        </div>

        <div className="socials-section">
        <div>
            <h3>Ne poți găsi pe: </h3>
            <div> 
            <Link
            className="link-style"
            to='#'
            onClick={(e) => {
                window.location.href = "https://www.facebook.com/profile.php?id=100082216396713";
                e.preventDefault();
            }}
            >

            Facebook
            </Link>
            
            </div>
            <div>
            <Link
            className="link-style"
            to='#'
            onClick={(e) => {
                window.location.href = "https://www.facebook.com/profile.php?id=100082216396713";
                e.preventDefault();
            }}
            >
              
            Instagram
            </Link>

            </div>
            <div> 
            <Link
            className="link-style"
            to='#'
            onClick={(e) => {
                window.location.href = "mailto:gustaresti@gmail.com";
                e.preventDefault();
            }}
        >
            gustaresti@gmail.com
            </Link>
            </div>
        </div>
        </div>
    </div>
  )
}
