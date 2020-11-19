import Cookies from "universal-cookie";

import { getInfo } from "../actions/info"
import { checkLogin, processGoogleLogin, redirectToGoogleLogin, gotoGoogleLogin, getUserInfo } from "../actions/user"

const cookies = new Cookies();

let initial_state = {
    google_login_url: undefined,
    serverGoogleClientID: undefined,
    loggedin: false,
    loggedin_check: false,
    loggedin_loading: false,
    login_error: undefined,
    login_loading: false,
    redirect_google: false,
    token: undefined,
    username: undefined,
    error: undefined,
    name: undefined,
    email: undefined,
    phone_number: undefined,
    info_loading: false,
    update_error: undefined,
    show_update_saved: false,
    should_load_user_info: false
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case "LOGOUT":
            return { ...initial_state }
        case "INFO_FULFILLED":
            if (state.redirect_google) {
                action.dispatch(redirectToGoogleLogin())
            }
            return {
                ...state,
                redirect_google: false,
                google_login_url: action.payload.googleLoginUrl,
                serverGoogleClientID: action.payload.serverGoogleClientID,
            }
        case "LOAD_COOKIES":
            let username = cookies.get("username");
            let token = cookies.get("token");
            let loggedin_check = true
            if (username !== undefined && token !== undefined) {
                loggedin_check = false
                action.dispatch(checkLogin(username, token))
            }
            return {
                ...state,
                loggedin_check,
                username,
                token
            }
        case "START_GOOGLE_LOGIN":  // Will be sent from android or iOS
            action.dispatch(processGoogleLogin(action.payload))
            break
        case "LOGGEDIN_PENDING":
            return {
                ...state,
                loggedin_loading: true
            }
        case "LOGGEDIN_REJECTED":
            return {
                ...state,
                loggedin: false,
                loggedin_check: true,
                loggedin_loading: false,
                error: action.payload
            }
        case "LOGGEDIN_FULFILLED":
            if (!action.payload.loggedin) {
                cookies.remove("username");
                cookies.remove("token");
                action.dispatch({ type: "LOGOUT" })
            } else {
                if (state.should_load_user_info) {
                    console.log("AAAA")
                    action.dispatch(getUserInfo(state.username, state.token))
                }
            }
            return {
                ...state,
                loggedin: action.payload.loggedin,
                loggedin_check: true,
                loggedin_loading: false,
                should_load_user_info: false
            }
        case "LOGIN_PENDING":
            return {
                ...state,
                login_loading: true
            }
        case "LOGIN_REJECTED":
            return {
                ...state,
                login_loading: false,
                login_error: action.payload
            }
        case "LOGIN_FULFILLED":
            let expiration = new Date(0)
            expiration.setUTCSeconds(action.payload.expiration)
            cookies.set("username", action.payload.username, { expires: expiration })
            cookies.set("token", action.payload.token, { expires: expiration })
            return {
                ...state,
                login_loading: false,
                loggedin: true,
                token: action.payload.token,
                username: action.payload.username
            }
        case "LOGOUT_REJECTED":
            return {
                ...state,
                error: action.payload
            }
        case "LOGOUT_FULFILLED":
            cookies.remove("username");
            cookies.remove("token");
            action.dispatch({ type: "LOGOUT" })
            return {
                ...state,
                loggedin: false,
                token: undefined,
                username: undefined
            }
        case "REDIRECT_GOOGLE_LOGIN":
            if (state.google_login_url === undefined || state.serverGoogleClientID === undefined) {
                action.dispatch(getInfo())
                return {
                    ...state,
                    redirect_google: true
                }
            }
            action.dispatch(gotoGoogleLogin(state.google_login_url, state.serverGoogleClientID))
            break
        case "FUTURE_USER_INFO":
            return {
                ...state,
                should_load_user_info: true
            }
        case "USER_INFO_PENDING":
            return {
                ...state,
                info_loading: true,
                should_load_user_info: false
            }
        case "USER_INFO_REJECTED":
            if (action.payload.response.status === 401) {
                action.dispatch(checkLogin(state.username, state.token))
            }
            return {
                ...state,
                info_loading: false,
                error: action.payload
            }
        case "USER_INFO_FULFILLED":
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                phone_number: action.payload.phoneNumber,
                info_loading: false
            }
        case "UPDATE_USER_INFO_PENDING":
            return {
                ...state,
                info_loading: true
            }
        case "UPDATE_USER_INFO_REJECTED":
            if (action.payload.response.status === 401) {
                action.dispatch(checkLogin(state.username, state.token))
            }
            return {
                ...state,
                info_loading: false,
                error: action.payload
            }
        case "UPDATE_USER_INFO_FULFILLED":
            action.dispatch((dispatch) => {
                setTimeout(() => {
                    dispatch({ type: "HIDE_SHOW_UPDATE_SAVE" })
                }, 5000)
            })
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                phone_number: action.payload.phoneNumber,
                info_loading: false,
                show_update_saved: true
            }
        case "HIDE_SHOW_UPDATE_SAVE":
            return {
                ...state,
                show_update_saved: false
            }
        default:
            break
    }
    return state
}