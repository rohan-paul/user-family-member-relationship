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
import styles from "./Dashboard-styles";
import FamilyMemberTables from "./Components/FamiltyMemberTables";
import Dropzone from "react-dropzone";
import { parse } from "papaparse";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class Dashboard extends Component {
  state = {
    files: [],
    data: []
  };
  // Function to use the browser's FileReader api to capture the uploaded file
  onDrop = files => {
    const file = files[0];
    if (file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = () => {
        const csv = reader.result;
        const {
          data,
          meta: { fields }
        } = parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });

        this.setState({
          data: data
        });
      };
      reader.onabort = () => alert("File reading was aborted.");
      reader.onerror = () => alert("File reading has failed.");
      reader.readAsBinaryString(file);
    }
  };
  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <div>
        {/*{console.log("UPLOADED DATA IS ", data)}*/}
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
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>

                  <ContactPhone />
                </Fab>

                <Fab color="green" aria-label="Add" className={classes.fab}>
                  <ContactPhone />
                </Fab>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginLeft: "25px" }}>Contact file</div>
                <div style={{ marginLeft: "25px" }}>From Google Platform</div>
              </div>
              <div>
                <Button variant="contained" className={classes.button}>
                  <Link to={{ pathname: "/votercircle", state: { data } }}>
                    Click to assign Voter Circles
                  </Link>
                </Button>
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
// <Link to="/votercircle"> Click to assgn Voter Circles </Link>
