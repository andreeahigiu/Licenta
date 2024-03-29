import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import{ createStore, applyMiddleware, compose } from 'redux'
// import 'bootstrap/dist/css/bootstrap.min.css'
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirestore, getFirebase } from 'react-redux-firebase';
import { db } from './firebase'; 
import app from './firebase';

import {
    ReactReduxFirebaseProvider,
    firebaseReducer
  } from 'react-redux-firebase'
// import firebase from 'firebase/app'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'


// const store = createStore(rootReducer, 
//     compose(
//         applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore})),
//         reduxFirestore(db),
//         reactReduxFirestore(db),
//      )
//     );


// const rrfProps = {
//     db,
//     config: {
//       userProfile: "users"
//     },
//     dispatch: store.dispatch
//   };
// const rrfConfig = {
//     userProfile: 'users',
//     useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
//   }

// const rrfProps = {
//    app,
//    config: rrfConfig,
//    dispatch: store.dispatch,
//    createFirestoreInstance // <- needed if using firestore
//  }

 // The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
 //const functions = require('firebase-functions');
 // The Firebase Admin SDK to access Firestore.
//  const admin = require('firebase-admin');
//  admin.initializeApp();

//ReactDOM.render(<Provider store = {store}> <ReactReduxFirebaseProvider {...rrfProps}> <App /> </ReactReduxFirebaseProvider></Provider> , document.getElementById('root') );

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store = {store}>  <App /> </Provider> , document.getElementById('root') );
