import { combineReducers } from 'redux';
import comment from './comment';
import login from './login';
const rootReducer = combineReducers({
    comment,
    login
})
export default rootReducer; 