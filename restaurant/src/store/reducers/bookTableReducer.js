// import initialScene from "../initialScene";

const initScene = { 
    sceneDisplay: {
        test: "working",
}}

const bookTableReducer = (state = initScene, action) => {
    switch(action.type) {
        case 'BOOK_TABLE':
            // console.log("displayed sscene", action.scene)
            return state;
        case 'BOOK_TABLE_ERROR':
            console.log("display scene error", action.err)
            return state;
        case 'ADD_TOO_CLIENT_BOOKINGS':
            console.log("added booking to customer collection", action)
            return state;
        case 'ADD_TOO_CLIENT_BOOKINGS_ERROR':
            console.log("booking to customer collection error", action.err)
            return state;


        default:
            return state;
    }
}

export default bookTableReducer