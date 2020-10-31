import { CUSTOMER_PROFILE_GET, 
    CUSTOMER_PROFILE_UPDATE } from "../action/actions";

const initialState = {
    customerProfile: {},
    restaurantProfile: {}
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case CUSTOMER_PROFILE_GET: 
            return {
                ...state,
                customerProfile: action.customer,
                restaurantProfile: {},
            };
        case CUSTOMER_PROFILE_UPDATE: 
            return {
                ...state,
                customerProfile: action.customer,
                restaurantProfile: {},
            };
        default:
            return state;
    }
  };

export default profileReducer;