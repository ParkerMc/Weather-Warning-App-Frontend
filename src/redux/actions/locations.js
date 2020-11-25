export function getCurrentLocation() {
    return (dispatch) => {
        dispatch({ type: "CURRENT_LOCATION_PENDING" })
        if (navigator.geolocation) {// TODO maybe different on mobile
            navigator.geolocation.getCurrentPosition(
                (responce) => { dispatch({ type: "CURRENT_LOCATION_FULFILLED", payload: responce }) },
                (e) => { dispatch({ type: "CURRENT_LOCATION_REJECTED", payload: e }) });
        } else {
            dispatch({ type: "CURRENT_LOCATION_REJECTED" })
        }
    }
}
