import { combineReducers } from 'redux'
import profileReducer from './profileReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import imageUploadReducer from './imageUploadReducer'
import restaurantSearchReducer from './restaurantSearchReducer'

export default combineReducers({
    profileState: profileReducer,
    signupState: signupReducer,
    loginState: loginReducer,
    imageState: imageUploadReducer,
    restaurantSearchState: restaurantSearchReducer,
})
