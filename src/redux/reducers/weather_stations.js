
let initial_state = {
    stations: {},
    current_station: {},
    error: null
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case "STATION_DATA":
            // TODO move to stations
            return {
                ...state,
                current_station: {
                    ...state.current_station,
                    ...action.payload   // TODO will need to phrase data
                }
            }
        default:
            return state
    }
}