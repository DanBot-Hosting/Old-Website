import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import * as api from "./api";

// pages
import Home from "./pages/home";
import NoMatch from "./pages/404";
import Stats from "./pages/stats";
import RedirectPage from "./pages/redirect";
import Callback from "./pages/callback";
import Ticket from './pages/ticket'
import Account_Index from "./pages/account";
import Node_Status from "./pages/individual-node-status";
import Account_New from "./pages/account/new";
import Account_Settings from "./pages/account/settings";
import Pass_Word_Reset from "./pages/account/password-reset";

class LoginHandler extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    };
  
    async componentDidMount() {
      const url = new URLSearchParams(window.location.search);
      const login = await api.logIn(url.get("code"));
      console.log(login);
    };
    render(){
      return (
        <h1>Loading</h1>
      );
    };
  
  };

  class App extends React.Component {
    render() {
      return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/stats" component={Stats}/>
                        <Route exact path="/stats/node/:ID" component={Node_Status}/>

                        <Route exact path="/ticket" component={Ticket}/>
                        <Route exact path="/callback" component={Callback}/>
                        <Route exact path="/account" component={Account_Index}/>
                        <Route exact path="/account/new" component={Account_New}/>
                        <Route exact path="/account/settings" component={Account_Settings}/>
                        <Route exact path="/account/settings/password-reset" component={Pass_Word_Reset}/>

                        
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
};

export default App;