import util from "util"
import axios from "axios"

export function getStationObservations(stationId) {
    return (dispatch) => {
        dispatch({ type: "STATION_OBSERVATIONS_PENDING" })
        axios.get(util.format("https://api.weather.gov/stations/%s/observations/latest", stationId))
            .then((responce) => {
                dispatch({ type: "STATION_OBSERVATIONS_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "STATION_OBSERVATIONS_REJECTED", payload: err })
            })
    }
}

export function getForecast(forecastOffice, zoneX, zoneY) {
    return (dispatch) => {
        dispatch({ type: "FORECAST_PENDING" })
        axios.get(util.format("https://api.weather.gov/gridpoints/%s/%d,%d", forecastOffice, zoneX, zoneY))
            .then((responce) => {
                dispatch({ type: "FORECAST_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "FORECAST_REJECTED", payload: err })
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