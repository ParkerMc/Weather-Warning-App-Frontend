import { persistCombineReducers } from "redux-persist"
import storage from 'redux-persist/lib/storage';

import info from "./info"
import settings from "./settings"
import user from "./user"
import weather from "./weather"

export default persistCombineReducers({ key: "root", storage: storage }, {
    info,
    settings,
    user,
    weather,
})