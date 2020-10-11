import { Map } from "immutable";
import { UPDATE_USER, UPDATE_ICON_COLOR } from "../defs/actionTypes";

const initialState = Map({
    username: "",
    userColor: "",
});

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return state.set("username", action.payload.name);
        case UPDATE_ICON_COLOR:
            return state.set("userColor", action.payload.color);

        default:
            return state;
    }
};

export default userReducer;
