
let initial_state = {
    dark_mode: false,
    error: null
}

export default function reducer(state = initial_state, action) {
    console.log(action)
    return state
}