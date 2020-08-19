import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Router } from "react-router-dom";
import history from "./history";
import NotFound from "./Components/NotFound/NotFound";
import AppDashBoard from "./Components/AppDashBoard";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFilter,
  faDownload,
  faCalendarAlt,
  faShip,
  faAnchor,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import FamiltyMemberTables from "./Components/FamiltyMemberTables";
library.add(faFilter, faDownload, faCalendarAlt, faShip, faAnchor, faUser);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Router history={history}>
          <div>
            <Switch>
              <Route path={"/"} component={AppDashBoard} />
              <Route
                exact
                path={"/familycircle"}
                component={FamiltyMemberTables}
              />

              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;
