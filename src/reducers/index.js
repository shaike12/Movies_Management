import { combineReducers } from 'redux'

import movies from './moviesReducer'
import members from './membersReducer'


export default combineReducers({
    movies,
    members
})