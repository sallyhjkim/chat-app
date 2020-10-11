import { Map } from "immutable";
import { UPDATE_USER } from "../defs/actionTypes";

const initialState = Map({
    username: "",
});

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return state.set("username", action.payload.name);

        default:
            return state;
    }
};

export default userReducer;
