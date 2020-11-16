
let initial_state = {
    loading: false,
    error: undefined
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
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
            return {
                ...state,
                loading: false
            }
        default:
            break
    }
    return state
}