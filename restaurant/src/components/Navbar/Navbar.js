import React, { Component } from 'react';
import { MenuItems} from "./MenuItems"
import './Navbar.css'
// import {Button} from "../Button"
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

class Navbar extends Component {

    state = { clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    signupRoute = () => {
        const { history } = this.props;
    
        history.push("/signup");
      };

    // const picture = new URL("./utils/background.jpg", import.meta.url)

    render() {
        return(
            <nav className="NavbarItems">
                {/* <h1 className="navbar-logo">Eat Out<i className="fa-solid fa-plate-utensils"></i></h1> */}
                <h1 className="navbar-logo">Eat Out <i className="fa-solid fa-utensils"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                   <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}> </i> 
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu' }>
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
                <Link to="signup">
                    <button className="signup_nav" onClick={this.signupRoute}> Sign up</button>
                </Link>

            </nav>
        )
    }
}

export default Navbar



