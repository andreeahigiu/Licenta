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
import { auth } from '../../../firebase';
import { PictureAsPdfSharp } from '@mui/icons-material';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { projectStorage } from '../../../firebase';
import { storage } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const Input = styled('input')({
  display: 'none',
});



class UpdateDetails extends Component {

  constructor(props) {
    super(props);
    //const updatedData = props;
    //console.log("data in UpdateDetails:", updatedData)


    this.state = {
      // name: '',
      // location: '',
      // places: '',
      // phone: '',
      // menuImage: '',
      // menuURL: '',
      waitingTime:"",
      pricing:"",
      cuisine:"",
  
    }

}

  async handleImageFieldChange(e) {
  
    // this.setState( {menuImage: e.target.files[0]}, () => { this.setState({menuImage: URL.createObjectURL(this.state.menuImage)}) } )
    //this.setState({menuURL: URL.createObjectURL(this.state.menuImage)});

    let file = e.target.files[0];

    console.log("uploaded file: ",file);

    const storageRef = ref(storage, `/files/${file.name}`);//second param is the location in the firebase storage where we wanna save the files
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) *100 );
    }, (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => this.setState( {menuImage: url}))
    }
    )

  }

  handleGalleryFieldChange(e) {
    // Loop through files
    const files = e.target.files
    let galleryImages =[]
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);
      console.log("in handle function", file)

      // let picObj = {"image": URL.createObjectURL(file)}
      // console.log("galleryy: ", picObj)

      // galleryImages.push(picObj)


      const storageRef = ref(storage, `/files/${file.name}`);//second param is the location in the firebase storage where we wanna save the files
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on("state_changed", (snapshot) => {
        const prog = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) *100 );
      }, (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          let picObj = {"image": url, "caption": file.name};
          galleryImages.push(picObj)
        })
      }
      )
    
    }

    console.log("array: ", galleryImages);
    this.setState({"gallery": galleryImages})
    // console.log("Images1: ", e.target.files)
    // console.log("Images2: ", e.target.files[e.target.files.length])
    // this.setState( {menuImage: e.target.files[0]}, () => { this.setState({menuImage: URL.createObjectURL(this.state.menuImage)}) } )
    //this.setState({menuURL: URL.createObjectURL(this.state.menuImage)});



    

  }

  handleChange(e) {
    console.log("target Val:", e.target)
    if(e.target.value != ''){
      if(e.target.id == undefined){
        this.setState({
          [e.target.name]: e.target.value
        })
      }
      else {
        this.setState({
          [e.target.id]: e.target.value
        })
      }

    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.updateRestaurant(this.state)
  }

  render() {
    let user = auth.currentUser.uid
    console.log("this state:", this.state)

    return (
      <div className="deails-wrap">
        {/* {console.log("props:", this.props.updatedData)} */}
        {    console.log("pics in state:", this.state.gallery)}
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
      // noValidate
      // validate={values => {
      //   const errors = {};
      //   if (values.location) {
      //     errors.latitude = "Required";
      //     errors.longitude = "Required";
      //   }

      // }}

      autoComplete="off"
    >
      <div className="form-and-btn">
      <div className="form-container">
      <div className="first-col">
      <TextField id="name" label="Nume" variant="outlined" onChange={e => this.handleChange(e)}/>
      <TextField
          id="location"
          name="location"
          onChange={e => this.handleChange(e)}
          label="Adresa"
          defaultValue=""
          // helperText="Mentionati adresa completa"
        />
        <div className="lat-long"> 
              <TextField
          id="longitude"
          name="longitude"
          onChange={e => this.handleChange(e)}
          required={this.state.location ? true : false}
          label="Longitudine"
          defaultValue=""
        />
              <TextField
          id="latitude"
          name="latitude"
          onChange={e => this.handleChange(e)}
          label="Latitudine"
          required={this.state.location ? true : false}
          // {... this.state.location ? required=true : required=false }
          defaultValue=""
        />
        </div>

        <TextField
          label="Numar telefon"
          id="phone"
          type="numeric"
          onChange={e => this.handleChange(e)}
          
          // InputProps={{
          //   startAdornment: <InputAdornment position="start">+(40)</InputAdornment>,
          // }}
        />

        <TextField id="email" label="Email" variant="outlined" onChange={e => this.handleChange(e)}/>

        <TextField
          disabled
          id="menuImageContainer"
          // onChange={e => this.handleChange(e)}
          label="Meniu"
          value="Adaugati o imagine"
          InputProps={{endAdornment:         
                          <label htmlFor="menuImage">
                          <Input accept="image/*" id="menuImage" multiple type="file" onChange={e => this.handleImageFieldChange(e)}/>
                          {/* <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => this.handleImageFieldChange(e)}/> */}
                          <Button variant="outlined" component="span">
                            Upload
                          </Button>
                          </label>
                          }}
        />

        <TextField
          disabled
          id="galleryContainer"
          // onChange={e => this.handleChange(e)}
          label="Galerie"
          value="Adaugati imaginile dorite"
          InputProps={{endAdornment:         
                          <label htmlFor="galleryImages">
                          <Input accept="image/*" id="galleryImages" multiple type="file" onChange={e => this.handleGalleryFieldChange(e)}/>
                          {/* <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => this.handleImageFieldChange(e)}/> */}
                          <Button variant="outlined" component="span">
                            Upload
                          </Button>
                          </label>
                          }}
        />

      </div>

      <div className="second-col">
      <TextField id="program" label="Program" variant="outlined" onChange={e => this.handleChange(e)}/>

      <TextField
          id="places"
          label="Numar locuri"
          type="number"
          onChange={e => this.handleChange(e)}
          InputLabelProps={{
            shrink: true,
          }}
        />

      {/* <TextField
          id="waitingTime"
          label="Timp mediu de asteptare"
          type="number"
          onChange={e => this.handleChange(e)}
          InputLabelProps={{
            shrink: true,
          }}
        /> */}


      <FormControl  >

      <InputLabel className="field">Preturi</InputLabel>
      <Select
        className="field"
        labelId="demo-simple-select-label"
        id="pricing"
        value={this.state.pricing}
        name="pricing"
        label="Preturi"
        onChange={e => this.handleChange(e)}
      >
        <MenuItem value={1}>Ieftin</MenuItem>
        <MenuItem value={2}>Mediu</MenuItem>
        <MenuItem value={3}>Scump</MenuItem>
        <MenuItem value={4}>Delux</MenuItem>
      </Select>
      </FormControl>


        <FormControl className="filters"> 
        <InputLabel id="demo-simple-select-label" >Bucatarie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="cuisine"
          name="cuisine"
          value={this.state.cuisine}
          label="Bucatarie"
          onChange={e => this.handleChange(e)}
        >

          <MenuItem value={1}>Americana</MenuItem>
          <MenuItem value={2}>Asiatica</MenuItem>
          <MenuItem value={3}>Europeana</MenuItem>
          <MenuItem value={4}>Italiana</MenuItem>
          <MenuItem value={5}>Romaneasca</MenuItem>
        </Select>
        </FormControl>

        <FormControl className="filters">
        <InputLabel id="demo-simple-select-label" >Timp de asteptare</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="waitingTime"
          name="waitingTime"
          value={this.state.waitingTime}
          label="Timp de asteptare"
          onChange={e => this.handleChange(e)}
        >

          <MenuItem value={1}>15-30 min</MenuItem>
          <MenuItem value={2}>30-50 min</MenuItem>
          <MenuItem value={3}>60 min</MenuItem>
        </Select>
        </FormControl>




      {/* <TextField id="cuisine" label="Bucatarie" variant="outlined" onChange={e => this.handleChange(e)}/> */}
      <TextField id="decor" label="Decor" variant="outlined" onChange={e => this.handleChange(e)}/>
      <TextField id="description" label="Descriere restaurant" variant="outlined" onChange={e => this.handleChange(e)}/>





      </div>
      </div>
{/* 
            {console.log("image: ", this.state.menuImage)}
            {console.log("image url: ", this.state.menuURL)} */}

{console.log("menu img: ", this.state.menuImage)}
        {this.state.menuImage && (
        <Box>
        <div>Image Preview:</div>
        <img src={this.state.menuImage} alt="Image" height="100px" />
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

const userHook = Component => props => {
  const userhook = useAuth();
  console.log("in function hook: ", userhook.currentUser)
  return <Component {...props} userhook={userhook} />;
};

export default connect(null, mapDispatchToProps)(UpdateDetails);

//the first param of connect is mapStateToProps, but we don't have it here, so we put null

