import React, { useState, Component, useEffect } from 'react';
import { MenuItems} from "./MenuItems"
import './Navbar.css'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"
import logo from '../../utils/images/logo-white-big.png' 



export default function Navbar({isAuth}) {
    const [clicked, setClicked] = useState(false)
    const { currentUser } = useAuth()
    const [userType, setUserType] = useState("");


    let history = useHistory();


    useEffect(() => {

        const checkUserType = async () => {
            if(currentUser != null){
                const customerdocRef = doc(db, "ProfileCustomer", currentUser.uid )
                const customerEl = await getDoc(customerdocRef)
        
                console.log("currentUser id:", currentUser.uid)
                const restaurantdocRef = doc(db, "ProfileRestaurant", currentUser.uid )
                const restaurantEl = await getDoc(restaurantdocRef)
        
                if(customerEl.exists()){
                    setUserType("customer")
                }
                else if(restaurantEl.exists()){
                    setUserType("restaurant")
                }

            }


        }

        checkUserType()
        .catch(console.error)


    }, [])


    function loginRoute() {

        history.push("/login");
      }

    async function dashboardRoute() {
        setClicked(false)

        if(userType == "customer")
        {
            history.push("/dashboardClient");
        }
        if(userType == "restaurant"){
            history.push("/dashboardRestaurant");
        }

      }

      async function loginRoute() {
        console.log("clicked before ", clicked)
        setClicked(false)
        console.log("clicked after ", clicked)

        history.push("/login");
      }


    return(
        
                    <nav className="NavbarItems">
                        <div className="navbar-logo">
                            <img className="logo-img" src={logo} alt={"logo"} />
                        </div>
                        <div className="menu-icon" onClick={() => setClicked(!clicked)}>
                           <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}> </i> 
                        </div>
                        <ul className={clicked ? 'nav-menu active' : 'nav-menu' }>
                            {MenuItems.map((item, index) => {
                                {
                                    return(
                                        <li key={index}> 
                                            <a className={item.cName} href={item.url}> 
                                            {item.title}
                                            </a> 
                                        </li>
                                    )
                                
                            }

                            })} 

                            <li>
                        {currentUser==null ?                           
                        <button className="signup_nav_responsive" onClick={loginRoute}> Log In </button>
                         :
                         <button className="signup_nav_responsive" onClick={dashboardRoute}> Profile </button>    
                        }
   
                            </li>
                        
        
                         </ul>

                        {currentUser==null ?                           
                        <Link to="login"> 
                         <button className="signup_nav" > Log In </button>
                         </Link> 
                         :
                         <button className="signup_nav" onClick={dashboardRoute}> Profil </button>    
                        }
        
                     </nav>
                 )
            
}



