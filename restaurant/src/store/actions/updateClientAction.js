import { db } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { setDoc } from "firebase/firestore";
import { auth } from "../../firebase";

export const updateClient = (client) => {
    return (dispatch) => {
        let currentUser = auth.currentUser

        db.collection('ProfileCustomer').doc(currentUser.uid).update({
            ...client,
            createdAt: new Date(),
        }).then( () => {
            dispatch({type: 'UPDATE_CLIENT', client})

        }).catch( (err) => {
            dispatch({type: 'UPDATE_CLIENT_ERROR', err})
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