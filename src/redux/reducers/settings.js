
let initial_state = {
    use_gps: false,
    time_interval: 15,
    notifications: {
        temperature: false,
        pressure: false,
        humidity: false,
        wind: false,
        email: false,
        rain: false,
        temperature_change: 10,
        pressure_change: 7,
        humidity_change: 20,
        windspeed_change: 10,
        chance_of_rain: 30,
    },
    dark_mode: false,
    error: null
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
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