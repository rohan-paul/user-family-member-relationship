import React, { Component } from "react";
// import history from "../../history";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import styles from "./Styles/analyticsStyles.js";
import { Row, Col } from "reactstrap";
import Typography from "@material-ui/core/Typography";

export class StockAnalyticsDashBoard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div
          style={{ display: "flex", flexDirection: "row" }}
          className={classes.root}
        />
      </React.Fragment>
    );
  }
}

StockAnalyticsDashBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StockAnalyticsDashBoard);
