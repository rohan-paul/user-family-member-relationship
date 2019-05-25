import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "../Components/NotFound/NotFound";
import FamiltyMemberTables from "../Components/FamiltyMemberTables";

import DashBoard from "../Dashboard";

export class DashboardRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={"/"} component={DashBoard} />
          <Route exact path={"/familycircle"} component={FamiltyMemberTables} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default DashboardRoutes;
