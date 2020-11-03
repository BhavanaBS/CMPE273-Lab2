import { RESTAURANT_EVENTS_GET, RESTAURANT_EVENT_POST } from "../action/actions";

const initialState = {
    restaurantEventAdd: {},
    restaurantEvents: {},
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
                //restaurantEvents: restaurantEvents,
                status: action.status,
            };        
        default:
            return state;
    }
  };

export default reviewRestaurant;