import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
// import { desc } from "./UtilFunctions/Utils";
import UnidentifiedTableHead from "./UnidentifiedTableHead";
import toolbarStyles from "./EnhancedTableToolbarStyles";
import EditToAddFamilyMember from "./EditToAddFamilyMember";

class UnidentifiedTableToolbar extends Component {
  state = {
    arrowRef: null
  };
  // function to handle the placement of the arrow on top of the Tooltip
  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };
  render() {
    const { numSelected, classes } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              Unidentified Members
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected === 1 ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip
                title={
                  <React.Fragment>
                    <h6>Add Family Realationship to this member</h6>
                    <span className={classes.arrow} ref={this.handleArrowRef} />
                  </React.Fragment>
                }
                placement="top-end"
                classes={{
                  tooltip: classes.bootstrapTooltip,
                  popper: classes.bootstrapPopper,
                  tooltipPlacementLeft: classes.bootstrapPlacementLeft,
                  tooltipPlacementRight: classes.bootstrapPlacementRight,
                  tooltipPlacementTop: classes.bootstrapPlacementTop,
                  tooltipPlacementBottom: classes.bootstrapPlacementBottom
                }}
                PopperProps={{
                  popperOptions: {
                    modifiers: {
                      arrow: {
                        enabled: Boolean(this.state.arrowRef),
                        element: this.state.arrowRef
                      }
                    }
                  }
                }}
              >
                <IconButton
                  aria-label="Edit"
                  variant="contained"
                  className={classes.button}
                >
                  {numSelected === 1 ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <EditToAddFamilyMember
                        itemToEdit={this.props.itemToEdit}
                        addItemToFamilyMember={this.props.addItemToFamilyMember}
                      />
                    </div>
                  ) : null}
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}

UnidentifiedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles)(UnidentifiedTableToolbar);
