import { TaskHandlerReducer } from "./reducers/index";
import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
const rootReducer = combineReducers({ TaskHandlerReducer });

const sagaMiddleWare = createSagaMiddleware();

const Store = createStore(rootReducer, applyMiddleware(sagaMiddleWare, logger));

sagaMiddleWare.run(rootSaga);

export default Store;
