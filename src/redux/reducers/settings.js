import { getSettings, checkLocationPermission, startSaveTimeout } from "../actions/settings"
import { checkLogin } from "../actions/user"

let initial_state = {
    darkMode: false,
    useGPS: true,
    useMetric: false,
    mainLocation: 0,
    loading: false,
    timeout: undefined,
    savedMsg: false,
    errorMsg: false,
    locationPermissionMsg: false,
    error: undefined
}

export default function reducer(state = initial_state, action) {
    let newState;
    switch (action.type) {
        case "LOGOUT":
            return { ...initial_state }

        case "SETTING_RESET_MSGS":
            return {
                ...state,
                savedMsg: false,
                errorMsg: false,
                locationPermissionMsg: false
            }

        case "POST_LOGIN":
        case "LOGGEDIN_FULFILLED":
            action.dispatch(getSettings(action.store.user.username, action.store.user.token))
            break

        case "SETTING_LOCATION_GOOD":
            action.dispatch(startSaveTimeout(action.store.user.username, action.store.user.token, state.darkMode, state.useGPS, state.useMetric, state.mainLocation))
            break

        case "SETTING_LOCATION_BAD":
            newState = {
                ...state,
                useGPS: false,
                mainLocation: (state.mainLocation === 0) ? 1 : state.mainLocation,
                errorMsg: true,
                locationPermissionMsg: true
            }
            action.dispatch(startSaveTimeout(action.store.user.username, action.store.user.token, newState.darkMode, newState.useGPS, newState.useMetric, newState.mainLocation))
            return newState

        case "SETTINGS_SAVE_TIMEOUT":
            return {
                ...state,
                timeout: action.payload
            }

        case "SETTINGS_PENDING":
            return {
                ...state,
                loading: true,
            }

        case "SETTINGS_REJECTED":
            if (action.payload.response.status === 401) {
                action.dispatch(checkLogin(state.username, state.token))
            }
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "SETTINGS_FULFILLED":
            if (action.payload.useGPS) {
                action.dispatch(checkLocationPermission(false))
            }
            return {
                ...state,
                ...action.payload,
                loading: false
            }


        case "SETTINGS_SAVE_PENDING":
            return {
                ...state,
                loading: true,
            }

        case "SETTINGS_SAVE_REJECTED":
            if (action.payload.response.status === 401) {
                action.dispatch(checkLogin(state.username, state.token))
            }
            return {
                ...state,
                loading: false,
                error: action.payload,
                errorMsg: true
            }

        case "SETTINGS_SAVE_FULFILLED":
            return {
                ...state,
                ...action.payload,
                loading: false,
                savedMsg: true
            }

        case "SETTINGS_CHANGE":
            if (state.timeout !== undefined) {
                clearTimeout(state.timeout)
            }

            newState = {
                ...state,
                ...action.payload,
                timeout: undefined,
                savedMsg: false,
                errorMsg: false,
                locationPermissionMsg: false
            }
            if (action.payload.useGPS !== null && action.payload.useGPS) {
                action.dispatch(checkLocationPermission(true))
            } else {
                action.dispatch(startSaveTimeout(action.store.user.username, action.store.user.token, newState.darkMode, newState.useGPS, newState.useMetric, newState.mainLocation))
            }
            if (!newState.useGPS && newState.mainLocation === 0) {
                newState.mainLocation = 1
            }
            return newState

        default:
            break
    }
    return state
}