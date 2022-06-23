import React, {Component} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './DashboardRestaurant.css'
import { styled } from '@mui/material/styles';
import {connect} from 'react-redux'
import { updateRestaurant } from '../../../store/actions/updateRestaurantActions';
// import updateRestaurant from '../../../store/actions/updateRestaurantActions';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from '../../../firebase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { doc, getDoc } from "firebase/firestore";
import { auth } from '../../../firebase';
import { db } from '../../../firebase';

const Input = styled('input')({
  display: 'none',
});



class UpdateDetails extends Component {

  constructor(props) {
    super(props);


    this.state = {

      profileImageName:"",
      menuName:"",
      open: false,
      currentRestaurant: [],
      galleryImagesNames: [],
  
    }

}

componentDidMount(){
  this.fetchMessages()
}

fetchMessages = () => {
  const query = db.collection('ProfileRestaurant').doc(auth.currentUser.uid);
  query.onSnapshot((doc) => {
      const currentRestaurantObj = {}
      currentRestaurantObj.data = doc.data()
      currentRestaurantObj.id = doc.id
      this.setState({
        ...this.state,
        currentRestaurant: [currentRestaurantObj, ...this.state.currentRestaurant]
      })

  })
}

  async handleImageFieldChange(e) {
  
    let file = e.target.files[0];
    console.log("THE FILE NAME", file.name)
    this.setState({ profileImageName: file.name, })

    console.log("uploaded file: ",file);

    const storageRef = ref(storage, `/files/${file.name}`);//second param is the location in the firebase storage where we wanna save the files
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot) => {
    }, (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => this.setState( {profileImage: url}))
    }
    )

  }

  async handleMenuFieldChange(e) {
  
    let file = e.target.files[0];
    this.setState({ menuName: file.name, })

    console.log("uploaded file: ",file);

    const storageRef = ref(storage, `/PDFs/${file.name}`);//second param is the location in the firebase storage where we wanna save the files
    const uploadTask = uploadBytesResumable(storageRef, file)


    uploadTask.on("state_changed", (snapshot) => {
    }, (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => this.setState( {menuImage: url}))
    }
    )

  }

  handleGalleryFieldChange(e) {
    const files = e.target.files
    let galleryImages =[]
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);
      console.log("in handle function", file)

      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on("state_changed", (snapshot) => {

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

  }

  handleChange(e) {
    console.log("target Val:", e.target)
    if(e.target.value !== ''){
      if(e.target.id === undefined){
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
    this.props.updateRestaurant(this.state)

    this.setState({ open: true })
    e.target.reset()
  }

  render() {
    console.log("this state:", this.state)
    return (
      <div className="deails-wrap">
        {/* {console.log("props:", this.props.updatedData)} */}
        {    console.log("pics in state:", this.state.gallery)}
      <div className="update-details-title">Modificare detalii</div>
      <Box
      onSubmit={this.handleSubmit}
      component="form"
 
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
        '& .MuiTextField-root': { m: 2, width:'30vw'},
      }}
      className="box-wrap"


      autoComplete="off"
    >
      <div className="form-and-btn">
      <div className="form-container">
      <div className="first-col">
      <TextField className="text-field" id="name" label="Nume" variant="outlined" onChange={e => this.handleChange(e)}/>
      <TextField
       className="text-field"
          id="location"
          name="location"
          onChange={e => this.handleChange(e)}
          label="Adresa"
          defaultValue=""
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
        className="text-field"
          label="Numar telefon"
          id="phone"
          type="numeric"
          onChange={e => this.handleChange(e)}
          
          // InputProps={{
          //   startAdornment: <InputAdornment position="start">+(40)</InputAdornment>,
          // }}
        />

        <TextField className="text-field" id="email" label="Email" variant="outlined" onChange={e => this.handleChange(e)}/>

        <TextField
        className="text-field"
          disabled
          id="menuImageContainer"
          // onChange={e => this.handleChange(e)}
          label="Meniu"
          value={this.state.menuName}
          InputProps={{endAdornment:         
                          <label htmlFor="menuImage">
                          <Input id="menuImage" multiple type="file" onChange={e => this.handleMenuFieldChange(e)}/>
                          {/* <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => this.handleImageFieldChange(e)}/> */}
                          <Button variant="outlined" component="span" className="upload-btn">
                            Upload
                          </Button>
                          </label>
                          }}
        />

      <TextField
        className="text-field"
          disabled
          id="profileImageContainer"
          // onChange={e => this.handleChange(e)}
          label="Imagine profil"
          value={this.state.profileImageName}
          InputProps={{endAdornment:         
                          <label htmlFor="profileImage">
                          <Input id="profileImage" multiple type="file" onChange={e => this.handleImageFieldChange(e)}/>
                          {/* <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => this.handleImageFieldChange(e)}/> */}
                          <Button variant="outlined" component="span" className="upload-btn">
                            Upload
                          </Button>
                          </label>
                          }}
        />

        <TextField
        className="text-field"
          disabled
          id="galleryContainer"
          // onChange={e => this.handleChange(e)}
          label="Galerie"
          value="Adaugati imaginile dorite"
          InputProps={{endAdornment:         
                          <label htmlFor="galleryImages">
                          <Input accept="image/*" id="galleryImages" multiple type="file" onChange={e => this.handleGalleryFieldChange(e)}/>
                          {/* <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => this.handleImageFieldChange(e)}/> */}
                          <Button variant="outlined" component="span" className="upload-btn">
                            Upload
                          </Button>
                          </label>
                          }}
        />

      </div>

      <div className="second-col">
      <TextField className="text-field" id="program" label="Program" variant="outlined" onChange={e => this.handleChange(e)}/>

      <TextField
      className="text-field"
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
        defaultValue={1}
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


        <FormControl className="field-imp"> 
        <InputLabel id="demo-simple-select-label" >Bucatarie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="cuisine"
          name="cuisine"
          defaultValue={1}
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

        <FormControl className="field-imp">
        <InputLabel id="demo-simple-select-label" >Timp de asteptare</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="waitingTime"
          name="waitingTime"
          defaultValue={1}
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
      <TextField className="text-field" id="decor" label="Decor" variant="outlined" onChange={e => this.handleChange(e)}/>
      <TextField className="text-field" id="description" label="Descriere restaurant" variant="outlined" onChange={e => this.handleChange(e)}/>

{console.log("gallery", this.state.gallery)}
<div>
{ 
  this.state.gallery ?
    this.state.gallery.forEach((image) => {
      return(
        <div>
          {image.caption}
        </div>
      )
    })
    :
    ""
}


</div>





      </div>
      </div>
{/* 
            {console.log("image: ", this.state.menuImage)}
            {console.log("image url: ", this.state.menuURL)} */}

{console.log("profile img name: ", this.state.profileImageName)}
        {/* {this.state.menuImage && (
        <Box>
        <div>Image Preview:</div>
        <Document file={this.state.menuImage}>
        <Page pageNumber={1} />

        </Document>
        </Box>
        )} */}

        <Button className="update-details-submit"variant="outlined" type="submit"
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          width: '30vw',
          ml: "16px",
          mt: "6vh",
          p: 2,
        }}>
          Actualizeaza date
        </Button>

        {/* <SimpleDialog
        open={this.state.open}
        onClose={this.setState({ open: false, })}
      /> */}
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

