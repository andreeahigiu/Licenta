import authReducer from "./authReducer";
import updateRestaurantReducer from "./updateRestaurantReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers( {
    auth: authReducer,
    updatedData: updateRestaurantReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;