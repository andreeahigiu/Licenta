const initState = {
    clientDetails : {
        name: "Robert Ionescu",
        phone: '0735644931',

    }
}

const updateClientReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_CLIENT':
            console.log("updated client", action.client)
            return state;
        case 'UPDATE_CLIENT_ERROR':
            console.log("updated client error", action.err)
            return state;
        default:
            return state;
    }
}

export default updateClientReducer