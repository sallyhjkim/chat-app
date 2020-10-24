import { Map } from "immutable";
import { UPDATE_USER } from "../defs/actionTypes";

const initialState = Map({
    user: "",
});

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return state.set("user", action.payload.user);

        default:
            return state;
    }
};

export default userReducer;
