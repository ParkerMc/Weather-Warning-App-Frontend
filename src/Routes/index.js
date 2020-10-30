import {Component} from "react"
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom"
import { } from "react-router-dom"

import Current from "./Current"
import Home from "./Home"
import NotFound from "./NotFound"

export default class Router extends Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/current" component={Current}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
}