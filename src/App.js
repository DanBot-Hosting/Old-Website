import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import * as api from "./util/api";

// pages
import Home from "./pages/home";
import NoMatch from "./pages/404";
import Stats from "./pages/stats";
import RedirectPage from "./pages/redirect";
import Callback from "./pages/callback";
import Account_Index from "./pages/account";
import Node_Status from "./pages/individual-node-status";
import Account_New from "./pages/account/new";
import Account_Settings from "./pages/account/settings";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/stats" component={Stats}/>
                    <Route exact path="/stats/node/:ID" component={Node_Status}/>

                    <Route exact path="/callback" component={Callback}/>
                    <Route exact path="/account" component={Account_Index}/>
                    <Route exact path="/account/new" component={Account_New}/>
                    <Route exact path="/account/settings" component={Account_Settings}/>

                    <Route path='/login' component={() => {
                        window.location.href = api.getOauth();
                        return RedirectPage;
                    }}/>

                    <Route path='/discord' component={() => {
                        window.location.href = "https://discord.gg/dFJdApwh2x"
                        return RedirectPage;
                    }}/>

                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;