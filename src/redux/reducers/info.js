
let initial_state = {
    loading: false,
    googleAPIKey: undefined,
    error: undefined
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case "LOGOUT":
            return { ...initial_state }
        case "INFO_PENDING":
            return {
                ...state,
                loading: true
            }
        case "INFO_REJECTED":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "INFO_FULFILLED":
            console.log(action.payload)
            return {
                ...state,
                googleAPIKey: action.payload.googleAPIKey,
                loading: false
            }
        default:
            break
    }
    return state
}