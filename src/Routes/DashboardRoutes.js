import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "../Components/NotFound/NotFound";
import StockAnalyticsDashBoard from "../Components/StockAnalytics/StockAnalyticsDashBoard";

import DashBoard from "../Dashboard";

export class DashboardRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={"/"} component={DashBoard} />

          <Route
            exact
            path={"/stock_dashboard"}
            component={StockAnalyticsDashBoard}
          />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default DashboardRoutes;
