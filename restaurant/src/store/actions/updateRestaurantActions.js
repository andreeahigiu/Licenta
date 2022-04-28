import { db } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { setDoc } from "firebase/firestore";

export const updateRestaurant = (restaurant) => {
    return (dispatch, getState) => {
        const id = 'hei'
        //make async call to db
        // const { currentUser } = useAuth()
        // console.log("current User: ", currentUser )

        // const docRef = doc(db, 'ProfileRestaurant', 'test2')
        // const newEl = {
        //         ...restaurant,
        //         otherField : 'something',
        //         createdAt: new Date()
        //     }
        // setDoc(docRef, newEl)

        db.collection('ProfileRestaurant').doc("miau").update({
            ...restaurant,
            otherField : 'otherthing',
            createdAt: new Date(),
            hello: 'nope',
        }).then( () => {
            dispatch({type: 'UPDATE_RESTAURANT', restaurant})

            // db.collection('AllRestaurants').doc("miau").collection('Tables').doc("newTable1").set({ 
            //     places: restaurant.places,
            // })
            db.collection('AllRestaurants').doc("miau").collection('Tables').add({ 
                places: restaurant.places,
            })

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