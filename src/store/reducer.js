import {combineReducers} from "redux";
import entitiesReducer from "./entities";


// Creating hierarchy of reducer functions
export default combineReducers({
    entites:entitiesReducer
})