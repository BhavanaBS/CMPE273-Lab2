import { combineReducers } from 'redux'
import profileReducer from './profileReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import imageUploadReducer from './imageUploadReducer'

export default combineReducers({
    profileState: profileReducer,
    signupState: signupReducer,
    loginState: loginReducer,
    imageState: imageUploadReducer
})
