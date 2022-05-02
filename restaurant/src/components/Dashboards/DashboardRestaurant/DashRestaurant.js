import React, {Component} from 'react'
import UpdateDetails from './UpdateDetails';
import UpdateScene from './UpdateScene';
import Restaurant from './Restaurant';
import { withStyles } from '@material-ui/core/styles';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import './DashboardRestaurant.css' 
import { connect } from 'react-redux';
import { useAuth } from '../../../contexts/AuthContext';
import { auth } from '../../../firebase';
import { Link } from 'react-router-dom'



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

    handleClick(selection) {
        this.setState({menuSelection : selection})

    }

    async handleLogout(){
        try {
            await auth.signOut()
            //navigate('/')
          } catch {
            console.log('Failed to log out')
          }
    }


    render(){
        const { classes } = this.props;
        //console.log(this.props.updatedData);
        const { updatedData } = this.props;
        //console.log("Here are the props: " , this.props.state);
        let user = auth.currentUser.uid
        console.log("user: ", user)

        return(
            <div className="dash-container">

                <div className='paper-container'>
                    <Paper sx={{ width: 250, height: '70vh', maxWidth: '100%', m: '10px', mt: '60px'}} className={classes.paper}>
      <MenuList>
        <MenuItem onClick={  () => this.handleClick("restaurant") } >
          <ListItemText>Restaurant </ListItemText>
        </MenuItem>

        <MenuItem sx={{mt: 4}} onClick={  () => this.handleClick("details")}>
          <ListItemText>Update Details</ListItemText>
        </MenuItem>

        <MenuItem sx={{mt: 4}} onClick={  () => this.handleClick("scene") }>
          <ListItemText>Update Scene</ListItemText>
        </MenuItem>

      <MenuItem  sx={{mt: 4}} onClick={  () => this.handleLogout() }>
      <Link to={'/'}>
          <ListItemText>Logout</ListItemText>
      </Link>
        </MenuItem>
      </MenuList>

    </Paper>
    </div>

                <div className="dash-content">
                {this.state.menuSelection == "details" && (<UpdateDetails updatedData={updatedData} />)}
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