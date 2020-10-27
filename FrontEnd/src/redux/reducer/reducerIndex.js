import { combineReducers } from 'redux'
import restaurantReducer from './restaurantReducer'
import customerReducer from './customerReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'

export default combineReducers({
    restaurant: restaurantReducer,
    customer: customerReducer,
    signupState: signupReducer,
    loginState: loginReducer

})
