import {
        RESTAURANT_PROFILE_GET_SUCCESS,
        RESTAURANT_PROFILE_UPDATE_SUCCESS,
        RESTAURANT_PROFILE_UPDATE_FAILED,
        LOGOUT
    } from "../action/actions";

const initialState = {
    showFailure: false,
    signupCompleted:false,
    restaurant_id: null
};

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case RESTAURANT_PROFILE_GET_SUCCESS: 
            return Object.assign({}, state, {
                restaurant: action.restaurant
            });
        case RESTAURANT_PROFILE_UPDATE_SUCCESS: 
            return Object.assign({}, state, {
                restaurant: action.restaurant
            });
        case RESTAURANT_PROFILE_UPDATE_FAILED: 
            return Object.assign({}, state, {
                showFailure: true
            });
            default:
            return state;
    }
  };

export default restaurantReducer;