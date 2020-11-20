
let initial_state = {
    current_weather: {},
    current_weather_loading: false,
    error: undefined
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case "LOGOUT":
            return { ...initial_state }
        // TODO support storing current weather locations
        case "CURRENT_WEATHER_PENDING":
            return {
                ...state,
                current_weather_loading: true
            }
        case "CURRENT_WEATHER_REJECTED":
            return {
                ...state,
                current_weather_loading: false,
                error: action.payload
            }
        case "CURRENT_WEATHER_FULFILLED":
            return {
                ...state,
                current_weather_loading: false,
                current_weather: { ...action.payload }
            }
        default:
            break
    }
    return state
}