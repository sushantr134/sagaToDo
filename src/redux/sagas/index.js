import { put, takeLatest, all } from "redux-saga/effects";
import { ADD_TASK } from "../actions";

function* addTask(action) {
  const { payload } = action;
  yield put({ type: ADD_TASK, payload });
}

function* jsonCall() {
  const json = yield fetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  ).then((res) => res.json());

  yield put({ type: "JSON_RECEIVED", payload: json });
}

function* actionWatchers() {
  yield takeLatest("ADD_TASK_CALL", addTask);
  yield takeLatest("JSON_CALL", jsonCall);
}

export function* rootSaga() {
  yield all([actionWatchers()]);
}
