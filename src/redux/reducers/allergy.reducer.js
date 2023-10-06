const allergyReducer = (state = [], action) => {
    switch (action.type) {
      case 'ALLERGY_CLASS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default allergyReducer;