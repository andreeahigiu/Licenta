import React from 'react'
import { useState, useEffect } from 'react';
import './DashboardRestaurant.css' 
import {v4 as uuid} from "uuid";
import { async } from '@firebase/util';
import { useSelector, useDispatch } from 'react-redux';
import { FormControlUnstyledContext } from '@mui/base';
import { displayScene } from '../../../store/actions/displaySceneAction';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from 'bootstrap';

export default function UpdateScene() {
  const [style, setStyle] = useState([]); 
  const [clicked, setClick] = useState(false);
  const [tables, setTables] = useState([])
  const [currentBtn, setCurrentBtn] = useState(null)
  const [updateScene, setUpdateScene] = useState({tables: [], styles: []})
  const [empty, setEmpty] = useState(true);
  const [seats, setSeats] = useState(2)
  const [specifications, setSpecifications] = useState("")
  
  const dispatch = useDispatch();
  const mystate = useSelector(state => state.scene)

  const [sceneState, setSceneState] = useState(mystate)


  const { currentUser } = useAuth()
  const [currentRestaurant, setCurrentRestaurants] = useState("")

  const [contextMenu, setContextMenu] = React.useState(null);

  function handleContextMenu (event, index) {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
    setCurrentBtn(index)
    setClick(false);
  };

  const handleClose = () => {
    setContextMenu(null);
    setClick(false);
  };

  const handleDeleteTable = () => {
    tables.splice(currentBtn, 1);
    style.splice(currentBtn, 1);

    setContextMenu(null);
    setTables(tables);
    setStyle(style);



    setClick(false);
  };

  function handleSeats(){
    tables[currentBtn].places = seats;
  }

  function displaySeats(index){
    let tablesCpy = structuredClone(tables)
    if(tablesCpy[index].places == 2){
      return <React.Fragment>
        <div id="point2-1"/>
        <div id="point2-2"/>
      </React.Fragment>
    }

    if(tablesCpy[index].places == 4){
      return   <React.Fragment>
      <div id="point4-1"/>
      <div id="point4-2"/>
      <div id="point4-3"/>
      <div id="point4-4"/>
    </React.Fragment>
    }

    if(tablesCpy[index].places == 6){
      return   <React.Fragment>
      <div id="point6-1"/>
      <div id="point6-2"/>
      <div id="point6-3"/>
      <div id="point6-4"/>
      <div id="point6-5"/>
      <div id="point6-6"/>
    </React.Fragment>
    }

    if(tablesCpy[index].places == 8){
      return <React.Fragment>
      <div id="point8-1"/>
      <div id="point8-2"/>
      <div id="point8-3"/>
      <div id="point8-4"/>
      <div id="point8-5"/>
      <div id="point8-6"/>
      <div id="point8-7"/>
      <div id="point8-8"/>
    </React.Fragment>
    }
  }

  function handleSeatsChange(e){
    setSeats(e.target.value)

    let allTables=tables
    let table = {...allTables[currentBtn]}
    table.places = e.target.value;
    tables[currentBtn] = table
    setTables(tables)
    // console.log("event", e)

    setContextMenu(null);
    setClick(false);
  }

  function handleSpecifications(e){
    e.preventDefault();
    setSpecifications(e.target.value)
    console.log("specifications:", e.target.value)

    let allTables=tables
    let table = {...allTables[currentBtn]}
    table.specifications = e.target.value;
    tables[currentBtn] = table
    setTables(tables)
    // console.log("event", e)

    // setContextMenu(null);
    // setClick(false);
  }

console.log("current table:", currentBtn,"seats:", seats)


async function getOneElement() {
  await db.collection('ProfileRestaurant').doc(currentUser.uid).get()
  .then(snapshot => {setCurrentRestaurants(snapshot.data())
                      console.log("heii")
                      setStyle(snapshot.data().style)
                      setTables(snapshot.data().tables)
  })
}


 useEffect(() => {

   getOneElement()
   console.log("currentRestaurant:", currentRestaurant)

}, []);


// console.log("reading restaurant ", currentRestaurant)
//   console.log("DB tables", tables)
//   console.log("DB style", style)



  function placeDiv(e){
    console.log("x si y:", e.clientX, e.clientY)
    // const newStyle = 
    //    setCoordinates(e.target.screenX,
    //                   e.target.screenY);
    // setStyle(newStyle);
    var parentCoord = document.getElementById('parent-id').getBoundingClientRect()
    
    //document.getElementsById("hello").style.color = 'red';

    //console.log("x,y parinte:", parentCoord.left, parentCoord.top)
    if(clicked == true){

      let tableStyles = style
      let table = {...tableStyles[currentBtn]}

      table.position = 'absolute'
      table.left = e.clientX-347-30-80 + 'px'
      table.top = e.clientY-180-23-15 + 'px'

      tableStyles[currentBtn] = table
      setStyle(tableStyles)

      //const newStyle = {position:'absolute', left:e.clientX-20 + 'px', top:e.clientY-20 + 'px'}
      //setStyle( styles=> [...styles, newStyle] )
      //console.log("clicked")
      setClick(false)
    }

  }

  function addTable(){
    const newItem = { id: uuid(), places: 2, specifications:"", reserved: false }
    setTables([...tables, newItem])
    const newStyle = {position:"absolute", left:"200px", top:"200px"}
    setStyle([...style, newStyle])
    
    //setStyle(style => [...style, newStyle])
    
    //setEmpty(false)
    // setStyle(styles => [...styles, newStyle])
    //setStyle({position:"absolute", left:"600px", top:"400px"})
    console.log("STYLE:", style)
  }

  function dealWithBtn(index, e){
    setCurrentBtn(index)
    setClick(true)


  }

  function tableList(){
    let styleArr = style
    if(tables){
      return tables.map((item,index) => {
        //console.log("table style:", styleArr[index])
        // setStyle( styles=> [...styles, newStyle] )
        console.log("Index", index, "Item:", item)
        return(

          <button id={index} className="table-btn" style={styleArr[index]} onClick={ (e) => dealWithBtn(index, e)} onContextMenu={ (e) => handleContextMenu(e, index)}> 
          <p className="table-label"> Masa noua{index} </p>
          {displaySeats(index)}

          
          </button>
        )
      })
    }


  }

  function handleSubmit(e){
    e.preventDefault();
    setUpdateScene({tables, style})

    console.log("updated scene:", updateScene)

    dispatch(displayScene(updateScene));
    console.log("test")

  }



  return (
    
    <form className="form-styles" onSubmit={handleSubmit}>
            <button onClick={addTable} className="scene-update-btn">+ Adauga o masa</button>
      <div 
      id='parent-id'
      className='scene-container'
      onClick = { e => placeDiv(e) }
      > 

      {/* {console.log("toate stilurile: ", style)} */}
      {tableList()}

      { console.log("buttonclicked?---------", clicked) }
      {/* <button id="table-btn" style={style} onClick={ () => setClick(true)} > Masa1 </button> */}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Inchide meniu si salveaza</MenuItem>
        <MenuItem onClick={handleDeleteTable}>Sterge masa</MenuItem>
        
        <div className="seats-specifications">



<FormControl  >
      <InputLabel className="places-field">Nr. locuri</InputLabel>
      <Select
        className="places-field"
        labelId="seats"
        id="seats"
        value={seats}
        name="seats"
        label="Nr. locuri"
        onChange={e => handleSeatsChange(e)}
      >
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={8}>8</MenuItem>
      </Select>
      </FormControl>



        <TextField
          id="outlined-multiline-static"
          label="Specificatii masa"
          multiline
          rows={4}
          defaultValue={currentBtn && tables[currentBtn].specifications}
          onChange={e => handleSpecifications(e)}
        />

</div>

      </Menu>
      </div>

      {/* <Button className="update-details-submit"variant="outlined" type="submit"
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          width: '100%',
          ml: "16px",
          mt: "6vh",
          p: 2,
          color: "",

        }}>
          Actualizeaza
        </Button> */}

      <button type="submit" className="scene-update-btn"> Actualizeaza </button>
      {/* <div className="test-div">test</div> */}
      </form>

  )
}
