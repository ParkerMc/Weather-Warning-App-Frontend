import axios from "axios"
import settings from "../../settings"
import util from "util"

export function getCurrentWeather(username, token, lat, lng) {
    return (dispatch) => {
        dispatch({ type: "CURRENT_WEATHER_PENDING" })
        axios.get(util.format(settings.api_url + "/user/location/%d%%2C%d/current", lat, lng), {
            headers: {
                "Auth-Username": username,
                "Auth-Token": token
            }
        })
            .then((responce) => {
                dispatch({ type: "CURRENT_WEATHER_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "CURRENT_WEATHER_REJECTED", payload: err })
            })
    }
}

export function getAlerts() {
    return (dispatch) => {
        dispatch({ type: "ALERTS_PENDING" })
        axios.get("https://api.weather.gov/alerts/active")
            .then((responce) => {
                dispatch({ type: "ALERTS_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "ALERTS_REJECTED", payload: err })
            })
    }
}