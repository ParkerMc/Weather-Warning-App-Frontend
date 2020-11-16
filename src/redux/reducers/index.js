import { combineReducers } from "redux"

import info from "./info"
import settings from "./settings"
import user from "./user"
import weather from "./weather"

export default combineReducers({
    info,
    settings,
    user,
    weather
})