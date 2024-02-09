import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import inputReducer from '../slices/inputSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    input: inputReducer,
});

export default rootReducer