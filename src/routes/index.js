import { Component } from "react"
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom"
import { } from "react-router-dom"

import Current from "./Current"
import Home from "./Home"
import NotFound from "./NotFound"
import GoogleCallback from "./GoogleCallback"
import Map from "./Map"
import Notifications from "./Notifications"
import Settings from "./Settings"

import Locations from "./settings/Locations"
import Profile from "./settings/Profile"

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/current" component={Current} />
                    <Route exact path="/google_callback" component={GoogleCallback} />
                    <Route exact path="/map" component={Map} />
                    <Route exact path="/notifications" component={Notifications} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/settings/locations" component={Locations} />
                    <Route exact path="/settings/profile" component={Profile} />
                    <Route exact path="*" component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}