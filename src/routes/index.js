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
import Profile from "./Profile"
import Settings from "./Settings"

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/current" component={Current} />
                    <Route path="/google_callback" component={GoogleCallback} />
                    <Route path="/map" component={Map} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/settings" component={Settings} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}