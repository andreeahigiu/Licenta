import { db } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { setDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { useState } from "react";


export const displayScene = (scene) => {
    let currentUser = auth.currentUser
    let dbdata=[]
    console.log("---the scene contains:", scene)

    async function getOneElement() {
        await db.collection('AllRestaurants').doc(currentUser.uid).collection('Tables').get()
        .then(function(snapshot) {
            if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(doc => {
                    // doc is a DocumentSnapshot with actual data
                    const data = doc.data().id;
                    dbdata.push(data)
                    
                })
            }}
            
            )
            return dbdata
      }
    
    return (dispatch, getState) => {


        db.collection('ProfileRestaurant').doc(currentUser.uid).update({
            ...scene,
        }).then( () => {
            dispatch({type: 'DISPLAY_SCENE', scene})


        }).catch( (err) => {
            dispatch({type: 'DISPLAY_SCENE_ERROR', err})
        })


        for( const tables in scene.tables){
            db.collection('AllRestaurants').doc(currentUser.uid).collection('Tables').doc(scene.tables[tables].id).set({
                ...scene.tables[tables],
                ...scene.style[tables],
                positionInArray: tables,

            }).then( () => {
                dispatch({type: 'ADD_TABLES', scene})
    
    
            }).catch( (err) => {
                dispatch({type: 'ADD_TABLES_ERROR', err})
            })
        }


    }
};