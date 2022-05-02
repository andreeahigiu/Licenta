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

