const offerReducer = (state = [], action) => {
    console.log('reducer offer', action.payload)
    switch(action.type) {
        case 'SET_OFFERS':
            return action.payload;
        case 'SET_OFFER_ITEM_NAME':
                return action.payload; 
        case 'CREATE_NEW_OFFER':
                return state;
        default:
            return state;
    }
};

export default offerReducer;