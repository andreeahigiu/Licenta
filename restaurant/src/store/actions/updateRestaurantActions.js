import { db } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { setDoc } from "firebase/firestore";
import { auth } from "../../firebase";

export const updateRestaurant = (restaurant) => {
    return (dispatch, getState) => {
        const id = 'hei'
        let currentUser = auth.currentUser

        db.collection('ProfileRestaurant').doc(currentUser.uid).update({
            ...restaurant,
            otherField : 'otherthing',
            createdAt: new Date(),
        }).then( () => {
            dispatch({type: 'UPDATE_RESTAURANT', restaurant})


            //
            if(restaurant.places){
                db.collection('AllRestaurants').doc(currentUser.uid).collection('Tables').add({ 
                    places: restaurant.places,
                })
            }


        }).catch( (err) => {
            dispatch({type: 'UPDATE_RESTAURANT_ERROR', err})
        })


    }
};


// export const updateRestaurant = (restaurant) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         //make async call to db
//         const firestore = getFirestore();
//         firestore.collection('ProfileRestaurant').add({
//             ...restaurant,
//             otherField : 'something',
//             createdAt: new Date()
//         }).then( () => {
//             dispatch({type: 'UPDATE_RESTAURANT', restaurant})
//         }).catch( (err) => {
//             dispatch({type: 'UPDATE_RESTAURANT_ERROR', err})
//         })


//     }
// };

//dispatch: dispatches an action to the reducer