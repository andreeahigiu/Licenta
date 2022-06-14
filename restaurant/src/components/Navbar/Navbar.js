import React, { useState, Component, useEffect } from 'react';
import { MenuItems} from "./MenuItems"
import './Navbar.css'
// import {Button} from "../Button"
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"
import DashboardClient from '../DashboardClient/DashboardClient';
import DashRestaurant from '../Dashboards/DashboardRestaurant/DashRestaurant';


export default function Navbar({isAuth}) {
    // state = { clicked: false}
    const [clicked, setClicked] = useState(false)
    const { currentUser } = useAuth()
    var route;
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


    const handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    function loginRoute() {
        // const { history } = this.props;

        history.push("/login");
      }

      async function getOneElement() {
        // db.collection('ProfileCustomer').doc(currentUser.uid).get()
        // .then(snapshot => setOneData(snapshot.data()))

      }

    async function dashboardRoute() {
        //console.log("clicked before ", clicked)
        setClicked(false)
        //console.log("clicked after ", clicked)

        // const customerdocRef = doc(db, "ProfileCustomer", currentUser.uid )
        // const customerEl = await getDoc(customerdocRef)

        // console.log("currentUser id:", currentUser.uid)
        // const restaurantdocRef = doc(db, "ProfileRestaurant", currentUser.uid )
        // const restaurantEl = await getDoc(restaurantdocRef)

        // console.log(customerEl.exists())
        // console.log("restaurantEl: ", restaurantEl)

        if(userType == "customer")
        {
            history.push("/dashboardClient");
        }
        if(userType == "restaurant"){
            history.push("/dashboardRestaurant");
            //return <DashRestaurant />
            // history.push({
            //     pathname: '/dashRestaurant',
            //     state: { state: "test" }
            // });
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
                        <h1 className="navbar-logo">Eat Out <i className="fa-solid fa-utensils"></i></h1>
                        <div className="menu-icon" onClick={() => setClicked(!clicked)}>
                           <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}> </i> 
                        </div>
                        <ul className={clicked ? 'nav-menu active' : 'nav-menu' }>
                            {MenuItems.map((item, index) => {
                                {
                                if(item.title =="Restaurante"){
                                    if(userType=="customer" || userType == ""){
                                        return(
                                            <li key={index}> 
                                                <a className={item.cName} href={item.url}> 
                                                {item.title}
                                                </a> 
                                            </li>
                                        )
                                    }else return
                                }
                                // else if(item.title =="Rezervari"){
                                //     if(userType=="restaurant"){
                                //         return(
                                //             <li key={index}> 
                                //                 <a className={item.cName} href={item.url}> 
                                //                 {item.title}
                                //                 </a> 
                                //             </li>
                                //         )
                                //     }else return
                                // }
                                else {
                                    return(
                                        <li key={index}> 
                                            <a className={item.cName} href={item.url}> 
                                            {item.title}
                                            </a> 
                                        </li>
                                    )
                                }
                            }

                            })} 
{/*                             
                            <li>
                                {userType=="restaurant" ?
                                    <button className="signup_nav_responsive" onClick={loginRoute}> Rezervari </button>
                                    :
                                    <div></div> 
                            }
                            </li> */}

                            <li>
                        {currentUser==null ?                           
                        <button className="signup_nav_responsive" onClick={loginRoute}> Log In </button>
                         :
                         <button className="signup_nav_responsive" onClick={dashboardRoute}> Profile </button>    
                        }
   
                            </li>
                        
        
                         </ul>
{/* 
                        {userType=="restaurant" ?
                                    <button className="signup_nav" onClick={loginRoute}> Rezervari </button>
                                    :
                                    <div></div> 
                        } */}

                        {currentUser==null ?                           
                        <Link to="login"> 
                         <button className="signup_nav" > Log In </button>
                         </Link> 
                         :
                         <button className="signup_nav" onClick={dashboardRoute}> Profil </button>    
                        }
                            {/* <div>
                         {isAuth ?             
                        <Link to="login">
                            <button className="signup_nav" onClick={this.loginRoute}> Log In</button>
                        </Link> 
                        : 
                        <Link to="logout">
                            <button className="signup_nav" onClick={this.loginRoute}> Log In</button>
                        </Link>
                        }
                        </div> */}
        
                     </nav>
                 )
            
}

// class Navbar extends Component {

//     state = { clicked: false}

//     handleClick = () => {
//         this.setState({clicked: !this.state.clicked})
//     }

//     loginRoute = () => {
//         const { history } = this.props;
    
//         history.push("/login");
//       };

//     logoutRoute = () => {
//         const { history } = this.props;
    
//         history.push("/");
//       };

//     // const picture = new URL("./utils/background.jpg", import.meta.url)

//     render() {
//         return(
//             <nav className="NavbarItems">
//                 {/* <h1 className="navbar-logo">Eat Out<i className="fa-solid fa-plate-utensils"></i></h1> */}
//                 <h1 className="navbar-logo">Eat Out <i className="fa-solid fa-utensils"></i></h1>
//                 <div className="menu-icon" onClick={this.handleClick}>
//                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}> </i> 
//                 </div>
//                 <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu' }>
//                     {MenuItems.map((item, index) => {
//                         return(
//                             <li key={index}> 
//                                 <a className={item.cName} href={item.url}> 
//                                 {item.title}
//                                 </a> 
//                             </li>
//                         )
//                     })}

//                 </ul>
//                 {isAuth ?                 
//                 <Link to="login">
//                     <button className="signup_nav" onClick={this.loginRoute}> Log In</button>
//                 </Link> 
//                 : 
//                 <Link to="logout">
//                     <button className="signup_nav" onClick={this.loginRoute}> Log In</button>
//                 </Link>
//                 }

//             </nav>
//         )
//     }
// }

// export default Navbar



