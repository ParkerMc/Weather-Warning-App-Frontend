import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { } from "react-router-dom";

import Current from "./Current"
import Home from "./Home"

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/current">
                    <Current />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}