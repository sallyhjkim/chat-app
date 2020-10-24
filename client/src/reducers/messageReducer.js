import { List, Map } from "immutable";
import { UPDATE_MESSAGES } from "../defs/actionTypes";

const initialState = Map({
    messages: List(),
});

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MESSAGES:
            return state.set("messages", action.payload.messages);

        default:
            return state;
    }
};

export default messageReducer;
