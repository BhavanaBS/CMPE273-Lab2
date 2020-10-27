import { CUSTOMER_PROFILE_GET_SUCCESS, 
    CUSTOMER_PROFILE_UPDATE_SUCCESS, 
    CUSTOMER_PROFILE_UPDATE_FAILED } from "../action/actions";

const initialState = {
    showFailure: false,
    signupCompleted: false,
    customer_id: null
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case CUSTOMER_PROFILE_GET_SUCCESS: 
            return Object.assign({}, state, {
                customer: action.customer
            });
        case CUSTOMER_PROFILE_UPDATE_SUCCESS: 
            return Object.assign({}, state, {
                showFailure: false,
                customer: action.customer
            });
        case CUSTOMER_PROFILE_UPDATE_FAILED: 
            return Object.assign({}, state, {
                showFailure: true
            });
        default:
            return state;
    }
  };

export default customerReducer;