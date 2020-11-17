
let initial_state = {
    use_gps: false,
    time_interval: 15,
    locations_enabled: [false, false, false],
    push_enabled: false,
    email_enabled: false,
    warnings_enabled: false,
    temperature_enabled: false,
    temperature_change: 10,
    pressure_enabled: false,
    pressure_change: 7,
    humidity_enabled: false,
    humidity_change: 20,
    wind_enabled: false,
    windspeed_change: 10,
    rain_enabled: false,
    rain_change: 30,
    dark_mode: false,
    error: undefined
}

export default function reducer(state = initial_state, action) {
    switch (action.type) { // TODO save to server
        case "LOGOUT":
            return { ...initial_state }
        case "SETTINGS_CHANGE":
            return {
                ...state,
                ...action.payload
            }
        default:
            break
    }
    return state
}