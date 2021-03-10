import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// pages
import home from "./pages/home";
import NoMatch from "./pages/404";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={home} />

                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;