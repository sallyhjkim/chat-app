import { combineReducers } from "redux";
import userReducer from "./userReducer";
import roomReducer from "./roomReducer";
import messageReducer from "./messageReducer";
const rootReducer = combineReducers({
    user: userReducer,
    room: roomReducer,
    message: messageReducer,
});

export default rootReducer;
