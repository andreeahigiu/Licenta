import authReducer from "./authReducer";
import updateRestaurantReducer from "./updateRestaurantReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers( {
    auth: authReducer,
    updatedData: updateRestaurantReducer,
    firestore: firestoreReducer
});

export default rootReducer;