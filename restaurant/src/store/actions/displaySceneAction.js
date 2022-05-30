import { db } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { setDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { useState } from "react";


export const displayScene = (scene) => {
    let currentUser = auth.currentUser
    let dbdata=[]

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
            sceneTest: 'working'
        }).then( () => {
            dispatch({type: 'DISPLAY_SCENE', scene})


        }).catch( (err) => {
            dispatch({type: 'DISPLAY_SCENE_ERROR', err})
        })


    //    var el = getOneElement()
    //    console.log("data.........", dbdata)
    //    for(it in dbdata){
    //        if({...scene.tables.indexOf(dbdata[it])} !== -1){
    //            console.log("yes")
    //        }
    //        else console.log("nope")
    //    }
    //     // const docRef= doc(db)

        // // console.log("hei, am facut dispatch", scene.tables)
        // db.collection('AllRestaurants').doc(currentUser.uid).collection('Tables').get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log("............db.........",`${doc.id} => ${doc.data()}`);
        //     });
        // })

        for( const tables in scene.tables){
            // console.log("sunt in for---------------", scene.tables[tables])
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