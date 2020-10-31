import { combineReducers } from 'redux'
import restaurantReducer from './restaurantReducer'
import profileReducer from './profileReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'

export default combineReducers({
    restaurant: restaurantReducer,
    profileState: profileReducer,
    signupState: signupReducer,
    loginState: loginReducer

})
