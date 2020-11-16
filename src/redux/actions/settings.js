export function changeSettings(obj) {
    return {
        type: "SETTINGS_CHANGE",
        payload: obj
    }
}