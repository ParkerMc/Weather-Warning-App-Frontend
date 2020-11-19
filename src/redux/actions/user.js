import { Capacitor, Plugins } from '@capacitor/core';

import axios from "axios"
import qs from "qs"

import settings from "../../settings"

const { GoogleLoginPlugin } = Plugins;

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

export function getUserInfo(username, token) {
    return (dispatch) => {
        if (username === undefined || token === undefined) {
            dispatch({ type: "FUTURE_USER_INFO" })
            return
        }
        dispatch({ type: "USER_INFO_PENDING" })
        axios.get(settings.api_url + "/user", {
            headers: {
                "Auth-Username": username,
                "Auth-Token": token
            }
        })
            .then((responce) => {
                dispatch({ type: "USER_INFO_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "USER_INFO_REJECTED", payload: err })
            })
    }
}

export function gotoGoogleLogin(google_login_url, serverGoogleClientID) {
    switch (Capacitor.getPlatform()) {
        case "ios":
            alert("Not implemented")
            break
        case "android":
            GoogleLoginPlugin.displayLogin({ client_id: serverGoogleClientID })
            break
        case "web":
        default:
            window.location.href = google_login_url
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

export function logout(username, token) {
    return (dispatch) => {
        dispatch({ type: "LOGOUT_PENDING" })
        axios.delete(settings.api_url + "/user/logout", {
            headers: {
                "Auth-Username": username,
                "Auth-Token": token
            }
        })
            .then((responce) => {
                dispatch({ type: "LOGOUT_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "LOGOUT_REJECTED", payload: err })
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

export function updateUserInfo(username, token, name, email, phoneNumber, password) {
    let data = { name, email, phoneNumber }
    if (password !== undefined) {
        data.password = password
    }
    return (dispatch) => {
        dispatch({ type: "UPDATE_USER_INFO_PENDING" })
        axios.put(settings.api_url + "/user", qs.stringify(data), {
            headers: {
                "Auth-Username": username,
                "Auth-Token": token
            }
        })
            .then((responce) => {
                dispatch({ type: "UPDATE_USER_INFO_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "UPDATE_USER_INFO_REJECTED", payload: err })
            })
    }
}