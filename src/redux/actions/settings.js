import axios from "axios"
import qs from "qs"

import settings from "../../settings"

export function changeSettings(name, val) {
    return {
        type: "SETTINGS_CHANGE",
        payload: { [name]: val }
    }
}

export function checkLocationPermission(doGoodCallback) {
    return (dispatch) => {
        if (navigator.geolocation) {// TODO maybe different on mobile
            navigator.geolocation.getCurrentPosition(
                (e) => { if (doGoodCallback) dispatch({ type: "SETTING_LOCATION_GOOD" }) },
                (e) => { dispatch({ type: "SETTING_LOCATION_BAD" }) },
                { enableHighAccuracy: true });
        } else {
            dispatch({ type: "SETTING_LOCATION_BAD" })
        }
    }
}

export function getSettings(username, token) {
    return (dispatch) => {
        if (username === undefined || token === undefined) {
            return  // Will auto be run after user is confirmed logged in
        }
        dispatch({ type: "SETTINGS_PENDING" })
        axios.get(settings.api_url + "/user/settings", {
            headers: {
                "Auth-Username": username,
                "Auth-Token": token
            }
        })
            .then((responce) => {
                dispatch({ type: "SETTINGS_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "SETTINGS_REJECTED", payload: err })
            })
    }
}

export function resetSettingsMSGS() {
    return { type: "SETTING_RESET_MSGS" }
}

export function saveSettings(username, token, darkMode, useGPS, useMetric, mainLocation) {
    return (dispatch) => {
        if (username === undefined || token === undefined) {
            return  // Will auto be run after user is confirmed logged in
        }
        dispatch({ type: "SETTINGS_SAVE_PENDING" })
        axios.put(settings.api_url + "/user/settings", qs.stringify({ darkMode, useGPS, useMetric, mainLocation }), {
            headers: {
                "Auth-Username": username,
                "Auth-Token": token
            }
        })
            .then((responce) => {
                dispatch({ type: "SETTINGS_SAVE_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "SETTINGS_SAVE_REJECTED", payload: err })
            })
    }
}

export function startSaveTimeout(username, token, darkMode, useGPS, useMetric, mainLocation) {
    return (dispatch) => {
        dispatch({
            type: "SETTINGS_SAVE_TIMEOUT", payload: Number(setTimeout(() => {
                dispatch(saveSettings(username, token, darkMode, useGPS, useMetric, mainLocation))
            }, settings.settingsSaveDelaySecs * 1000))
        })
    }
}