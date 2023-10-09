const profileReducer = (state = [], action) => {
    console.log('payload in profilered:', action.payload)
    switch(action.type) {
        case 'SET_USER_PROFILE':
            return action.payload;
        default:
            return state;
    }
};

export default profileReducer;