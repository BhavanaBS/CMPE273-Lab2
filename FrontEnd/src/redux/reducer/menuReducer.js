import { RESTAURANT_MENU_GET, RESTAURANT_MENU_DISH_POST, RESTAURANT_MENU_DISH_GET, RESTAURANT_MENU_DISH_DELETE, 
    CUSTOMER_MENU_GET } from "../action/actions";

const initialState = {
    postDish : {},
    status: null,
};

const menuReducer = (state = initialState, action) => {
    console.log('menuReducer.js -> action.payload : ', action.payload);
    switch (action.type) {
        case RESTAURANT_MENU_GET: 
            return {
                ...state,
                status: action.status,
            };
        case RESTAURANT_MENU_DISH_POST: 
            return {
                ...state,
                postDish: action.payload,
                status: action.status,
            };
        case RESTAURANT_MENU_DISH_GET:  
            return {
                ...state,
                status: action.status,
            };
        case RESTAURANT_MENU_DISH_DELETE: 
            return {
                ...state,
                status: action.status,
            }; 
        case CUSTOMER_MENU_GET: 
            return {
                ...state,
                status: action.status,
            };          
        default:
            return state;
    }
};

export default menuReducer;