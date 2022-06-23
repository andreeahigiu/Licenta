import { db } from "../../firebase";
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

