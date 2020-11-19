import axios from "axios"

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