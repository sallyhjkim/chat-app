import { put, takeEvery, all } from "redux-saga/effects";
import { UPDATE_USER, UPDATE_ROOM, UPDATE_MESSAGES } from "../defs/actionTypes";

function* asyncHandler(actionType, payload) {
    yield put({ type: actionType, payload: payload });
}

function* sagaAsyncCallGenerator(actionType) {
    yield takeEvery(actionType, asyncHandler);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        sagaAsyncCallGenerator(UPDATE_USER),
        sagaAsyncCallGenerator(UPDATE_ROOM),
        sagaAsyncCallGenerator(UPDATE_MESSAGES),
    ]);
}
