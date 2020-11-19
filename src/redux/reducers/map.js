
let initial_state = {
    advisories: undefined,
    warnings: undefined,
    watches: undefined,
    alerts_loading: false,
    error: undefined
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case "LOGOUT":
            return { ...initial_state }
        case "ALERTS_PENDING":
            return {
                ...state,
                alerts_loading: true
            }
        case "ALERTS_REJECTED":
            return {
                ...state,
                alerts_loading: false,
                error: action.payload
            }
        case "ALERTS_FULFILLED":
            let advisories = []
            let warnings = []
            let watches = []
            for (let i of action.payload.features) {
                if (i.geometry !== null) {
                    let val = {
                        id: i.id,
                        paths: i.geometry.coordinates.map((path) => {
                            return path.map((cords) => {
                                return { lng: cords[0], lat: cords[1] }
                            })
                        }),
                        headline: i.properties.headline,
                        description: i.properties.description
                    }
                    if (i.properties.event.includes("Advisory")) {
                        advisories.push(val)
                    } else if (i.properties.event.includes("Warning")) {
                        warnings.push(val)
                    } else if (i.properties.event.includes("Watch")) {
                        watches.push(val)
                    }
                }
            }
            return {
                ...state,
                advisories,
                warnings,
                watches,
                alerts_loading: false
            }
        default:
            break
    }
    return state
}