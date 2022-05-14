import React from 'react'
import { useState } from 'react';
import './DashboardRestaurant.css' 
import {v4 as uuid} from "uuid";
import { async } from '@firebase/util';

export default function UpdateScene() {
  const [style, setStyle] = useState([]); 
  const [clicked, setClick] = useState(true);
  const [tables, setTables] = useState( [])
  const [currentBtn, setCurrentBtn] = useState(null)

const setCoordinates = (x,y) => {
// You don't need whitespace in here, I added it for readability
// I would recommend using something like EmotionJS for this
console.log("x si y:")
    return `position:absolute;   
            left:${x}px;         
            top:${y}px;`
}
// { e => { 
//   console.log("x si y:")
//   const newStyle = 
//        setCoordinates(e.target.screenX,
//                       e.target.screenY);
//   setStyle(newStyle);
//   }}

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
      table.left = e.clientX-20 + 'px'
      table.top = e.clientY-20 + 'px'

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
    setTables( tables => [...tables, newItem])
    const newStyle = {position:"absolute", left:"600px", top:"400px"}
    setStyle(styles => [...styles, newStyle])
    // setStyle({position:"absolute", left:"600px", top:"400px"})
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
  

  return (
      <div 
      id='parent-id'
      className='scene-container'
      onClick = { e => placeDiv(e) }
      >I am here
      <button onClick={addTable}>+ Adauga o masa</button>
      {console.log("toate stilurile: ", style)}
      {tableList()}
      {/* <button id="table-btn" style={style} onClick={ () => setClick(true)} > Masa1 </button> */}
      </div>

  )
}
