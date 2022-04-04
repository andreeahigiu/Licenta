import React, { useState, Component } from 'react';
import { MenuItems} from "./MenuItems"
import './Navbar.css'
// import {Button} from "../Button"
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';


export default function Navbar({isAuth}) {
    // state = { clicked: false}
    const [clicked, setClicked] = useState(false)

    let history = useHistory();
    //   const handleChange = (event) => {
    //     setState({ ...state, [event.target.name]: event.target.checked });
    //   };

    const handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    function loginRoute() {
        // const { history } = this.props;
        console.log("hello", isAuth)
        if(isAuth){
            history.push("/about")
        }else{
            history.push("/about")
        }


        // isAuth ? history.push("/about") : history.push("/login");
      };

    const logoutRoute = () => {
        const { history } = this.props;
    
        history.push("/");
      };

    // const picture = new URL("./utils/background.jpg", import.meta.url)

    return(
        
                    <nav className="NavbarItems">
                        {/* <h1 className="navbar-logo">Eat Out<i className="fa-solid fa-plate-utensils"></i></h1> */}
                        <h1 className="navbar-logo">Eat Out <i className="fa-solid fa-utensils"></i></h1>
                        <div className="menu-icon" onClick={() => setClicked(!clicked)}>
                           <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}> </i> 
                        </div>
                        <ul className={clicked ? 'nav-menu active' : 'nav-menu' }>
                            {MenuItems.map((item, index) => {
                                return(
                                    <li key={index}> 
                                        <a className={item.cName} href={item.url}> 
                                        {item.title}
                                        </a> 
                                    </li>
                                )
                            })}
        
                         </ul>

                         <Link to="login"> 
                         <button className="signup_nav" onClick={loginRoute}> Log In </button>
                            {/* <button className="signup_nav" onClick={loginRoute}>  {isAuth ? 'Log Out' : 'Log In'}</button> */}
                         </Link> 
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



