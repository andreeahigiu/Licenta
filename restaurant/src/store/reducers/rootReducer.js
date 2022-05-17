import authReducer from "./authReducer";
import updateRestaurantReducer from "./updateRestaurantReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import updateClientReducer from "./updateClientReducer";
import DisplaySceneReducer from "./DisplaySceneReducer";

const rootReducer = combineReducers( {
    auth: authReducer,
    updatedData: updateRestaurantReducer,
    updatedClient: updateClientReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    scene: DisplaySceneReducer,
});

export default rootReducer;