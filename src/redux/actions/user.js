import axios from "axios"
import qs from "qs"
import settings from "../../settings"

export function checkLogin(username, token) {
    return (dispatch) => {
        dispatch({ type: "LOGGEDIN_PENDING" })
        axios.get(settings.api_url + "/user/loggedin", {
            headers: {
                "Auth-Username": username,
                "Auth-Token": token
            }
        })
            .then((responce) => {
                dispatch({ type: "LOGGEDIN_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "LOGGEDIN_REJECTED", payload: err })
            })
    }
}

export function loadCookies() {
    return { type: "LOAD_COOKIES" }
}

export function login(identifier, password) {
    return (dispatch) => {
        dispatch({ type: "LOGIN_PENDING" })
        axios.post(settings.api_url + "/user/login", qs.stringify({ identifier, password }))
            .then((responce) => {
                dispatch({ type: "LOGIN_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "LOGIN_REJECTED", payload: err })
            })
    }
}

export function processGoogleLogin(code) {
    return (dispatch) => {
        dispatch({ type: "LOGIN_PENDING" })
        axios.post(settings.api_url + "/user/google_login", qs.stringify({ code: code }))
            .then((responce) => {
                dispatch({ type: "LOGIN_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "LOGIN_REJECTED", payload: err })
            })
    }
}

export function redirectToGoogleLogin() {
    return { type: "REDIRECT_GOOGLE_LOGIN" }
}

export function signUp(username, email, password) {
    return (dispatch) => {
        dispatch({ type: "LOGIN_PENDING" })
        axios.post(settings.api_url + "/user", qs.stringify({ username, email, password }))
            .then((responce) => {
                dispatch({ type: "LOGIN_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "LOGIN_REJECTED", payload: err })
            })
    }
}