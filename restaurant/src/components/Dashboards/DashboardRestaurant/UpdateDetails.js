import React, {Component} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import './DashboardRestaurant.css'
import { styled } from '@mui/material/styles';
import {connect} from 'react-redux'
import { updateRestaurant } from '../../../store/actions/updateRestaurantActions';
// import updateRestaurant from '../../../store/actions/updateRestaurantActions';

const Input = styled('input')({
  display: 'none',
});



class UpdateDetails extends Component {

  // state = {
  //   name: '',
  //   location: '',
  //   places: '',
  //   menuImage: '',
  //   menuURL: '',

  // }

  constructor(props) {
    super(props);
    //const updatedData = props;


    this.state = {
      // name: '',
      // location: '',
      // places: '',
      // phone: '',
      // menuImage: '',
      // menuURL: '',
  
    }

}

  handleImageFieldChange(e) {

    this.setState( {menuImage: e.target.files[0]}, () => { this.setState({menuURL: URL.createObjectURL(this.state.menuImage)}) } )
    //this.setState({menuURL: URL.createObjectURL(this.state.menuImage)});
  }

  
  handleChange(e) {
    console.log("target Val:", e.target.value)
    if(e.target.value != ''){
      this.setState({
        [e.target.id]: e.target.value
      })
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.updateRestaurant(this.state)
  }
  render() {
    return (
      <div className="deails-wrap">
        {/* {console.log("props:", this.props.updatedData)} */}
      <div className="update-details-title">Modificare detalii</div>
      <Box
      onSubmit={this.handleSubmit}
      component="form"
      // sx={{
      //   '& .MuiTextField-root': { m: 2, width: '25ch' },
      // }}
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
        '& .MuiTextField-root': { m: 2, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField id="name" label="Nume" variant="outlined" onChange={e => this.handleChange(e)}/>
      <TextField
          id="location"
          onChange={e => this.handleChange(e)}
          label="Locatie"
          defaultValue=""
          helperText="Mentionati adresa completa"
        />
        <TextField
          id="places"
          label="Numar locuri"
          type="number"
          onChange={e => this.handleChange(e)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Numar telefon"
          id="phone"
          type="number"
          onChange={e => this.handleChange(e)}
          InputProps={{
            startAdornment: <InputAdornment position="start">+(40)</InputAdornment>,
          }}
        />

        <TextField
          disabled
          id="standard-name"
          label="Meniu"
          value="Adaugati o imagine"
          InputProps={{endAdornment:         
                          <label htmlFor="contained-button-file">
                          <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => this.handleImageFieldChange(e)}/>
                          <Button variant="outlined" component="span">
                            Upload
                          </Button>
                          </label>}}
        />
{/* 
            {console.log("image: ", this.state.menuImage)}
            {console.log("image url: ", this.state.menuURL)} */}

        {this.state.menuURL && this.state.menuImage && (
        <Box>
        <div>Image Preview:</div>
        <img src={this.state.menuURL} alt="Image" height="100px" />
        </Box>
        )}

        <Button className="update-details-submit"variant="outlined" type="submit"
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          width: '100%',
          ml: "16px",
          mt: "6vh",
          p: 2,
        }}>
          Actualizeaza date
        </Button>

    </div>
    </Box>

      </div>
    )
  }
}
//onChange={e => this.setState({menuImage: e.target.files[0]})}
const mapDispatchToProps = (dispatch) => {
  return {
    updateRestaurant: (restaurant) => dispatch(updateRestaurant(restaurant))
  }
}

export default connect(null, mapDispatchToProps)(UpdateDetails);

//the first param of connect is mapStateToProps, but we don't have it here, so we put null

