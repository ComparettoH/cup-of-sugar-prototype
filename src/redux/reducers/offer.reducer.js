const offerReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_OFFERS':
            return action.payload;
        case 'SET_OFFER_ITEM_NAME':
                return action.payload; 
        case 'CREATE_NEW_OFFER':
                return action.payload;
        default:
            return state;
    }
};

export default offerReducer;