import { applyMiddleware, createStore } from "redux"

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

export default createStore(reducer, middleware) // TODO make store persistent w/ redux-persist & redux-persist-capacitor-storage




