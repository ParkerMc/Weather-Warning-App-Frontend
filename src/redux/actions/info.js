import axios from "axios"
import settings from "../../settings"

export function getInfo() {
    return (dispatch) => {
        dispatch({ type: "INFO_PENDING" })
        axios.get(settings.api_url + "/info")
            .then((responce) => {
                dispatch({ type: "INFO_FULFILLED", payload: responce.data })
            })
            .catch((err) => {
                dispatch({ type: "INFO_REJECTED", payload: err })
            })
    }
}