import { combineReducers } from "redux"

import settings from "./settings"
import weather_stations from "./weather_stations"

export default combineReducers({
    settings,
    weather_stations
})