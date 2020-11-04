import { RESTAURANT_EVENTS_GET, RESTAURANT_EVENT_POST, 
    CUSTOMER_EVENTS, CUSTOMER_REGISTERED_EVENTS, CUSTOMER_REGISTER_TO_EVENT } from "../action/actions";

const initialState = {
    restaurantEventAdd: {},
    restaurantEvents: {},
    customerRegisteredEvents: {},
    status: null,
};

const reviewRestaurant = (state = initialState, action) => {
    console.log('reviewRestaurant.js -> action.payload : ', action.payload);
    switch (action.type) {
        case RESTAURANT_EVENTS_GET: 
            return {
                ...state,
                restaurantEvents: action.payload,
                restaurantEventAdd: {},
                status: action.status,
            };
        case RESTAURANT_EVENT_POST: 
            return {
                ...state,
                restaurantEventAdd: action.payload,
                status: action.status,
            };
        case CUSTOMER_EVENTS:  
            return {
                ...state,
                customerEvents: action.payload,
                status: action.status,
            };
        case CUSTOMER_REGISTERED_EVENTS: 
            return {
                ...state,
                customerRegisteredEvents: action.payload,
                status: action.status,
            }; 
        case CUSTOMER_REGISTER_TO_EVENT: 
            return {
                ...state,
                customerRegisterToEvent: action.payload,
                status: action.status,
            };          
        default:
            return state;
    }
  };

export default reviewRestaurant;