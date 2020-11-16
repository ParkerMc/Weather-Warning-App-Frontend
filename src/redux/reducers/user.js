import Cookies from "universal-cookie";

import { getInfo } from "../actions/info"
import { checkLogin, redirectToGoogleLogin } from "../actions/user"

const cookies = new Cookies();

let initial_state = {
    google_login_url: undefined,
    loggedin: false,
    loggedin_check: false,
    loggedin_loading: false,
    login_error: undefined,
    login_loading: false,
    redirect_google: false,
    token: undefined,
    username: undefined,
    error: undefined
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case "INFO_FULFILLED":
            if (state.redirect_google) {
                action.dispatch(redirectToGoogleLogin())
            }
            return {
                ...state,
                redirect_google: false,
                google_login_url: action.payload.googleLoginUrl
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
            }
            return {
                ...state,
                loggedin: action.payload.loggedin,
                loggedin_check: true,
                loggedin_loading: false
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
        case "REDIRECT_GOOGLE_LOGIN":
            if (state.google_login_url === undefined) {
                action.dispatch(getInfo())
                return {
                    ...state,
                    redirect_google: true
                }
            }
            window.location.href = state.google_login_url
            break
        default:
            break
    }
    return state
}