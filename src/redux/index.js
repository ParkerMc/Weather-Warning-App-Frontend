import { applyMiddleware, createStore } from "redux"
import { persistStore } from "redux-persist"
import { Capacitor, Plugins } from '@capacitor/core';

import thunk from "redux-thunk"

import reducer from "./reducers"

const errorMiddleware = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error(err)
        console.debug("current state", store.getState());
        console.debug("last action was", action);
        return err
    }
}

const dispatchMiddleware = store => next => action => {
    let queue = [];

    function dispatch(action) {
        queue = [...queue, action]
    }
    const actionWithQueue = { ...action, dispatch, store: store.getState() }

    const data = next(actionWithQueue)

    queue.forEach(a => store.dispatch(a)); // flush queue

    return data
}

const middleware = applyMiddleware(errorMiddleware, thunk, dispatchMiddleware)

export const store = createStore(reducer, middleware)
export const persistor = persistStore(store)

const { GoogleLoginPlugin } = Plugins;
switch (Capacitor.getPlatform()) {
    case "ios":
        alert("Not implemented")
        break
    case "android":
        GoogleLoginPlugin.addListener("redux", (data) => {
            store.dispatch(data)
        })
        break
    case "web":
    default:
}


