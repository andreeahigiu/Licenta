import { db } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { setDoc } from "firebase/firestore";
import { auth } from "../../firebase";

export const displayScene = (scene) => {
    return (dispatch, getState) => {
        let currentUser = auth.currentUser

        db.collection('ProfileRestaurant').doc(currentUser.uid).update({
            ...scene,
            sceneTest: 'working'
        }).then( () => {
            dispatch({type: 'DISPLAY_SCENE', scene})


        }).catch( (err) => {
            dispatch({type: 'DISPLAY_SCENE_ERROR', err})
        })


    }
};