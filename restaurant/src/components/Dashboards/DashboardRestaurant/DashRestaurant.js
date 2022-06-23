import React, {Component} from 'react'
import UpdateDetails from './UpdateDetails';
import UpdateScene from './UpdateScene';
import Restaurant from './Restaurant';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import './DashboardRestaurant.css' 
import { connect } from 'react-redux';
import { auth } from '../../../firebase';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import BookingsCalendar from './BookingsCalendar';



const styles = theme =>  ({
    paper:{
        display:'grid',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius:'25px',
        alignItems:'center',
        textAlign: 'center',
        verticalAlign: 'middle',
        align: 'middle',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: '140px',

      },
    menuItem:{
        paddingTop : '100px',
    },
});




class DashRestaurant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuSelection: "restaurant"
        }
        
    }

    scrollToTop = () =>{
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
      });
    };

    handleClick(selection) {
        this.setState({menuSelection : selection})
        this.scrollToTop()

    }

    async handleLogout(){
        try {
            await auth.signOut()
          } catch {
            console.log('Failed to log out')
          }
    }


    render(){
        const { classes } = this.props;

        const { updatedData } = this.props;
        console.log("datele actualizate:", updatedData);
        let user = auth.currentUser.uid
        console.log("user: ", user)
        console.log("data:", updatedData);

        return(
            <div className="dash-container">

                <div className='paper-container'>
                    <Paper sx={{ width: 250, height: '70vh', maxWidth: '100%', m: '10px', mt: '60px'}} className={classes.paper}>
      <MenuList>
        <MenuItem sx={{mt: 8}} onClick={  () => this.handleClick("restaurant") } >
          <ListItemText>Restaurant </ListItemText>
        </MenuItem>

        <MenuItem sx={{mt: 4}} onClick={  () => this.handleClick("rezervari") } >
          <ListItemText>Rezervări </ListItemText>
        </MenuItem>

        <MenuItem sx={{mt: 4}} onClick={  () => this.handleClick("details")}>
          <ListItemText>Actualizare detalii</ListItemText>
        </MenuItem>

        <MenuItem className="edit-scene-menu-item" sx={{mt: 4}} onClick={  () => this.handleClick("scene") }>
          <ListItemText>Actualizare scenă</ListItemText>
        </MenuItem>


      <MenuItem sx={{mt: 8}}>
        <Button className="logout-btn" onClick={() => this.handleLogout()} style={{ color: "rgb(55, 40, 22)", '&:hover': {
      backgroundColor: '#f59342',
      color: '#3c52b2',
  },}}> 
      <LogoutIcon style={{ color: "rgb(55, 40, 22)"}}/> 
        Logout
      </Button>
      </MenuItem>


      </MenuList>

    </Paper>
    </div>

                <div className="dash-content">
                {this.state.menuSelection == "details" && (<UpdateDetails updatedData={updatedData} />)}
                {this.state.menuSelection == "rezervari" && (<BookingsCalendar />)}
                {this.state.menuSelection == "scene" && (<UpdateScene />)}
                {this.state.menuSelection == "restaurant" && (<Restaurant updatedData={updatedData}/>)}

                </div>



            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        updatedData: state.updatedData.restaurantDetails
    }
}

export default connect(mapStateToProps)(withStyles(styles)(DashRestaurant));