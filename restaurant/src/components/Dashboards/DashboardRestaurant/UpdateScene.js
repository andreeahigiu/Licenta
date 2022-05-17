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

export default function UpdateScene() {
  const [style, setStyle] = useState([]); 
  const [clicked, setClick] = useState(true);
  const [tables, setTables] = useState([])
  const [currentBtn, setCurrentBtn] = useState(null)
  const [updateScene, setUpdateScene] = useState({tables: [], styles: []})
  const [empty, setEmpty] = useState(true);
  
  const dispatch = useDispatch();
  const mystate = useSelector(state => state.scene)

  const [sceneState, setSceneState] = useState(mystate)


  const { currentUser } = useAuth()
  const [currentRestaurant, setCurrentRestaurants] = useState("")



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


console.log("reading restaurant ", currentRestaurant)
  console.log("DB tables", tables)
  console.log("DB style", style)



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
      table.left = e.screenX-347-20 + 'px'
      table.top = e.screenY-257-20 + 'px'

      tableStyles[currentBtn] = table
      setStyle(tableStyles)

      //const newStyle = {position:'absolute', left:e.clientX-20 + 'px', top:e.clientY-20 + 'px'}
      //setStyle( styles=> [...styles, newStyle] )
      //console.log("clicked")
      setClick(false)
    }

  }

  function addTable(){
    const newItem = { id: uuid(), places: "", specifications:"" }
    setTables([...tables, newItem])
    const newStyle = {position:"absolute", left:"200px", top:"200px"}
    setStyle([...style, newStyle])
    
    //setStyle(style => [...style, newStyle])
    
    //setEmpty(false)
    // setStyle(styles => [...styles, newStyle])
    //setStyle({position:"absolute", left:"600px", top:"400px"})
    console.log("STYLE:", style)
  }

  function dealWithBtn(index){
    setCurrentBtn(index)
    setClick(true)
  }

  function tableList(){
    let styleArr = style
    if(tables){
      return tables.map((item,index) => {
        //console.log("table style:", styleArr[index])
        // setStyle( styles=> [...styles, newStyle] )
        return(
          <button id={index} className="table-btn" style={styleArr[index]} onClick={ () => dealWithBtn(index)} > Masa noua{index} </button>
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
            <button onClick={addTable}>+ Adauga o masa</button>
      <div 
      id='parent-id'
      className='scene-container'
      onClick = { e => placeDiv(e) }
      > 

      {/* {console.log("toate stilurile: ", style)} */}
      {tableList()}
      {/* <button id="table-btn" style={style} onClick={ () => setClick(true)} > Masa1 </button> */}

      </div>

      <button type="submit"> Actualizeaza </button>
      {/* <div className="test-div">test</div> */}
      </form>

  )
}
