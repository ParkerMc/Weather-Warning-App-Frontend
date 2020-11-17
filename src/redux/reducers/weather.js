
let initial_state = {
    current_station: {},
    current_forecast: {},
    loading: false,
    error: undefined
}

// TODO set human readable location 

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case "LOGOUT":
            return { ...initial_state }
        // TODO support storing multiple stations and forcasts
        case "FORECAST_PENDING":
            return {
                ...state,
                loading: true
            }
        case "FORECAST_REJECTED":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "FORECAST_FULFILLED":
            let forecast_data = action.payload.properties
            return {
                ...state,
                loading: false,
                current_forecast: { // TODO store .unitCode for checking
                    ...state.current_station,
                    rain_chance: forecast_data.probabilityOfPrecipitation.values[0].value

                }
            }

        case "STATION_OBSERVATIONS_PENDING":
            return {
                ...state,
                loading: true
            }
        case "STATION_OBSERVATIONS_REJECTED":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "STATION_OBSERVATIONS_FULFILLED":
            let station_data = action.payload.properties
            return {
                ...state,
                loading: false,
                current_station: { // TODO store .unitCode for checking
                    ...state.current_station,
                    pressure: station_data.barometricPressure.value,
                    temperature: station_data.temperature.value,
                    low: station_data.minTemperatureLast24Hours.value, // TODO low and high seem to be missing
                    high: station_data.maxTemperatureLast24Hours.value,
                    humidity: station_data.relativeHumidity.value.toFixed(2),
                    wind_speed: station_data.windSpeed.value,
                }
            }
        default:
            break
    }
    return state
}