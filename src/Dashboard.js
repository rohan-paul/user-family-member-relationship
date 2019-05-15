import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
// import Google from "./assets/Images/Icons/google.png";
import Fab from "@material-ui/core/Fab";
import ContactPhone from "@material-ui/icons/ContactPhone";
// import Icon from "@material-ui/core/Icon";
import styles from "./Dashboard-styles";

const data = [
  {
    _id: "5cdc56878b9c427327ada12c",
    age: 27,
    firstName: "Shirley ",
    lastName: "Louise",
    gender: "female",
    email: "louiseholmes@sarasonic.com",
    phone: "+1 (976) 536-2680",
    location: "Olney"
  },
  {
    _id: "5cdc5687f6e223b1d409203d",
    age: 21,
    firstName: "Rochelle ",
    lastName: "Howard",
    gender: "male",
    email: "howardholmes@sarasonic.com",
    phone: "+1 (976) 534-3336",
    location: "Fedora"
  }
];

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          spacing={32}
          direction="column"
          alignItems="center"
          justify="center"
          style={{
            minHeight: "100vh",
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "norepeat",
            backgroundSize: "cover",
            overflow: "hidden",
            position: "relative",
            margin: 0
          }}
        >
          <Card className={classes.card}>
            <div className={classes.cardHeader}>
              <CardHeader
                disableTypography={true}
                className={classes.title}
                title="Select a platform to import contacts"
              />
            </div>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Fab color="green" aria-label="Add" className={classes.fab}>
                  <ContactPhone />
                </Fab>

                <Fab color="green" aria-label="Add" className={classes.fab}>
                  <ContactPhone />
                </Fab>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginLeft: "25px" }}>Contact file</div>
                <div style={{ marginLeft: "25px" }}>Contact file</div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);

// <img src={Google} className={classes.circularIcon} alt="" />
