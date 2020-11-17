import { applyMiddleware, createStore } from "redux"
import { persistStore } from "redux-persist"
import { Plugins } from '@capacitor/core';

import thunk from "redux-thunk"

import reducer from "./reducers"

const dispatchMiddleware = store => next => action => {
    let queue = [];

    function dispatch(action) {
        queue = [...queue, action]
    }
    const actionWithQueue = { ...action, dispatch }

    const data = next(actionWithQueue)

    queue.forEach(a => store.dispatch(a)); // flush queue

    return data
}

const middleware = applyMiddleware(thunk, dispatchMiddleware)

export const store = createStore(reducer, middleware)
export const persistor = persistStore(store)

const { GoogleLoginPlugin } = Plugins;
GoogleLoginPlugin.addListener("redux", (data) => {
    store.dispatch(data)
})


