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
  const [sceneOutline, setSceneOutline] = useState(Array(18).fill(""))

  function handleContextMenu (event, index) {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : 
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

    setContextMenu(null);
    setClick(false);
  }

  function handleSpecifications(e){
    e.preventDefault();
    setSpecifications(e.target.value)

    let allTables=tables
    let table = {...allTables[currentBtn]}
    table.specifications = e.target.value;
    tables[currentBtn] = table
    setTables(tables)
  }



async function getOneElement() {
  await db.collection('ProfileRestaurant').doc(currentUser.uid).get()
  .then(snapshot => {setCurrentRestaurants(snapshot.data())
                      if(snapshot.data().style){
                        setStyle(snapshot.data().style)
                      }

                      if(snapshot.data().tables){
                        setTables(snapshot.data().tables)
                      }

                      if(snapshot.data().sceneOutline){
                        setSceneOutline(snapshot.data().sceneOutline)
                      }

  })
}

 useEffect(() => {

   getOneElement()

}, []);


function changeOutline(e, position){
  sceneOutline[position]= e.target.value
  setSceneOutline(sceneOutline)
}

console.log("scene outline:", sceneOutline)

  function placeDiv(e){
    console.log("x si y:", e.clientX, e.clientY)

    var parentCoord = document.getElementById('parent-id').getBoundingClientRect()
    
    if(clicked == true){

      let tableStyles = style
      let table = {...tableStyles[currentBtn]}

      table.position = 'absolute'
      table.left = e.clientX-347-30-80 + 'px'
      table.top = e.clientY-180-23-15 + 'px'

      tableStyles[currentBtn] = table
      setStyle(tableStyles)

      setClick(false)
    }

  }

  function addTable(e){
    e.preventDefault()
    const newItem = { id: uuid(), places: 2, specifications:"", reserved: false }
    setTables([...tables, newItem])
    const newStyle = {position:"absolute", left:"200px", top:"200px"}
    setStyle([...style, newStyle])

  }

  function dealWithBtn(index, e){
    setCurrentBtn(index)
    setClick(true)

  }

  function tableList(){
    let styleArr = style
    if(tables){
      return tables.map((item,index) => {

        return(

          <button id={index} className="table-btn" style={styleArr[index]} onClick={ (e) => dealWithBtn(index, e)} onContextMenu={ (e) => handleContextMenu(e, index)}> 
          <p className="table-label"> Masă nouă{index} </p>
          {displaySeats(index)}

          </button>
        )
      })
    }


  }

  function handleSubmit(e){
    e.preventDefault();
    setUpdateScene({tables, style, sceneOutline})

    dispatch(displayScene(updateScene));

  }


  return (
    
    <form className="form-styles" onSubmit={handleSubmit}>
            <button onClick={(e) => addTable(e)} className="scene-update-btn">+ Adauga o masa</button>
      <div 
      id='parent-id'
      className='scene-container'
      onClick = { e => placeDiv(e) }
      > 
      <div className="scene-top">
        <input id="0" defaultValue={sceneOutline[0]} className="input-style" onChange={(e) => changeOutline(e, 0)}/>
        <input id="1" defaultValue={sceneOutline[1]} className="input-style" onChange={(e) => changeOutline(e, 1)}/>
        <input id="2" defaultValue={sceneOutline[2]} className="input-style" onChange={(e) => changeOutline(e, 2)}/>
        <input id="3" defaultValue={sceneOutline[3]} className="input-style" onChange={(e) => changeOutline(e, 3)}/>
        <input id="4" defaultValue={sceneOutline[4]} className="input-style" onChange={(e) => changeOutline(e, 4)}/>
      </div>

<div className="scene-left-right"> 
<div className="scene-left">
        <input id="5" defaultValue={sceneOutline[5]} type="text" className="input-style-vertical" onChange={(e) => changeOutline(5)}/>
        <input id="6" defaultValue={sceneOutline[6]} className="input-style-vertical" onChange={(e) => changeOutline(e, 6)}/>
        <input id="7" defaultValue={sceneOutline[7]} className="input-style-vertical" onChange={(e) => changeOutline(e, 7)}/>
        <input id="8" defaultValue={sceneOutline[8]} className="input-style-vertical" onChange={(e) => changeOutline(e, 8)}/>


      </div>

      <div className="scene-right">
        <input id="9" defaultValue={sceneOutline[9]} className="input-style-vertical" onChange={(e) => changeOutline(e, 9)}/>
        <input id="10" defaultValue={sceneOutline[10]} className="input-style-vertical" onChange={(e) => changeOutline(e, 10)}/>
        <input id="11" defaultValue={sceneOutline[11]} className="input-style-vertical" onChange={(e) => changeOutline(e, 11)}/>
        <input id="12" defaultValue={sceneOutline[12]} className="input-style-vertical" onChange={(e) => changeOutline(e, 12)}/>

      </div>
</div>

      <div className="scene-bottom">
        <input id="13" defaultValue={sceneOutline[13]} className="input-style" onChange={(e) => changeOutline(e, 13)}/>
        <input id="14" defaultValue={sceneOutline[14]} className="input-style" onChange={(e) => changeOutline(e, 14)}/>
        <input id="15" defaultValue={sceneOutline[15]} className="input-style" onChange={(e) => changeOutline(e, 15)}/>
        <input id="16" defaultValue={sceneOutline[16]} className="input-style" onChange={(e) => changeOutline(e, 16)}/>
        <input id="17" defaultValue={sceneOutline[17]} className="input-style" onChange={(e) => changeOutline(e, 17)}/>
      </div>

      {tableList()}

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
        <MenuItem onClick={handleClose}>Închide meniu și salvează</MenuItem>
        <MenuItem onClick={handleDeleteTable}>Șterge masa</MenuItem>
        
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

      <button type="submit" className="scene-update-btn"> Actualizează </button>

      </form>

  )
}
