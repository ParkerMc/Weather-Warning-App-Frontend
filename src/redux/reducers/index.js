import { combineReducers } from "redux"

import settings from "./settings"
import weather from "./weather"

export default combineReducers({
    settings,
    weather
})