import { getCurrentWeather } from "../actions/weather"

let initial_state = {
    getting_current_location: false,
    current_location: {},
    error: undefined
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case "LOGOUT":
            return { ...initial_state }

        case "CURRENT_LOCATION_PENDING":
            return {
                ...state,
                getting_current_location: true
            }
        case "CURRENT_LOCATION_REJECTED":
            // TODO check why maybe disable GPS
            return {
                ...state,
                getting_current_location: false,
                error: action.payload
            }
        case "CURRENT_LOCATION_FULFILLED":
            // TODO get current weather
            // TODO make sure user is logged in
            action.dispatch(getCurrentWeather(action.store.user.username, action.store.user.token, action.payload.coords.latitude, action.payload.coords.longitude))
            return {
                ...state,
                getting_current_location: false,
                current_location: action.payload.coords
            }
        default:
            break
    }
    return state
}