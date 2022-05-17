// import initialScene from "../initialScene";

const initScene = { 
    sceneDisplay: {
        test: "working",
}}

const DisplaySceneReducer = (state = initScene, action) => {
    switch(action.type) {
        case 'DISPLAY_SCENE':
            console.log("displayed sscene", action.scene)
            return state;
        case 'DISPLAY_SCENE_ERROR':
            console.log("display scene error", action.err)
            return state;
        default:
            return state;
    }
}

export default DisplaySceneReducer