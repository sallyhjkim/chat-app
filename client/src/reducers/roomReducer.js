import { Map } from "immutable";
import { UPDATE_ROOM } from "../defs/actionTypes";

const initialState = Map({
    room: "",
});

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ROOM:
            return state.set("room", action.payload.room);

        default:
            return state;
    }
};

export default rootReducer;
