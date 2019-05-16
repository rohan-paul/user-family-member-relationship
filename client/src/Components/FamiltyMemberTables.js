import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
// import dataFromFile from "./familyData";
import { stableSort } from "./UtilFunctions/Utils";
import { getSorting } from "./UtilFunctions/Utils";
import UnidentifiedTableHead from "./UnidentifiedTableHead";
import UnidentifiedTableToolbar from "./UnidentifiedTableToolbar";
import FamilyMemberTableHead from "./FamilyMemberTableHead";
import FamilyMemberTableToolbar from "./FamilyMemberTableToolbar";
import { showDeleteSnackbar } from "./Snackbars/showEmptyFieldAndDeleteSnackbar";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./UtilFunctions/confirmDelete.css";
import "./UtilFunctions/snackbar.css";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class FamiltyMemberTables extends React.Component {
  state = {
    order: "asc",
    orderBy: "firstName",
    selected: [],
    selectedFamilyMember: [],
    unidentifiedData: [],
    familyData: [],
    page: 0,
    rowsPerPage: 5
  };

  componentDidMount() {
    // if (this.props.location && this.props.location.state) {
    const unidentifiedDataFromCSV =
      //   this.props.location &&
      this.props.location.state && this.props.location.state.data;
    axios
      .post("/api/unidentifiedmember-route/batch", unidentifiedDataFromCSV)
      .then(res => {
        this.setState(
          {
            unidentifiedData: res.data
          },
          () => {
            axios
              .get("api/familyMemberRoute")
              .then(res => {
                this.setState({
                  familyData: res.data
                });
              })
              .catch(error => {
                console.log("Error occured ", error);
              });
          }
        );
      });
  }

  updateUnidentifiedMemberState = () => {
    axios
      .get("api/unidentifiedmember-route")
      .then(res => {
        this.setState({
          unidentifiedData: res.data
        });
      })
      .catch(error => {
        console.log("Error occured ", error);
      });
  };

  updateFamilyMemberState = () => {
    axios
      .get("api/familyMemberRoute")
      .then(res => {
        this.setState({
          familyData: res.data
        });
      })
      .catch(error => {
        console.log("Error occured ", error);
      });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  addItemToFamilyMember = item => {
    console.log("THE NEW ITEM IS ", item);
    this.setState({
      selectedFamilyMember: [item, ...this.state.selectedFamilyMember]
    });
  };

  handleSelectAllClickFamilyData = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selectedFamilyMember: state.familyData.map(n => n._id)
      }));
      return;
    }
    this.setState({ selectedFamilyMember: [] });
  };

  handleClickFamilyMember = (event, id) => {
    const { selectedFamilyMember } = this.state;
    const selectedIndex = selectedFamilyMember.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedFamilyMember, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedFamilyMember.slice(1));
    } else if (selectedIndex === selectedFamilyMember.length - 1) {
      newSelected = newSelected.concat(selectedFamilyMember.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedFamilyMember.slice(0, selectedIndex),
        selectedFamilyMember.slice(selectedIndex + 1)
      );
    }
    this.setState({ selectedFamilyMember: newSelected });
  };

  isSelectedFamilyMember = id =>
    this.state.selectedFamilyMember.indexOf(id) !== -1;

  // Function to handle the Unidentified Table

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: state.unidentifiedData.map(n => n._id)
      }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  unSelectItems = () => {
    this.setState({
      selected: []
    });
  };

  returnDocumentToEdit = id => {
    if (this.state.selected.length !== 0) {
      return this.state.unidentifiedData.filter(item => item._id === id);
    }
  };

  confirmDeleteCustom = idArr => {
    console.log("Delete activated with ", idArr);
    let payload = {
      unidentifiedMember_id_list_arr: idArr
    };
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this Member</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                axios
                  .delete("/api/unidentifiedmember-route/delete", {
                    data: payload
                  })
                  .then(() => {
                    this.setState({
                      unidentifiedData: [this.state.unidentifiedData],
                      selected: []
                    });
                  })
                  .then(() => {
                    showDeleteSnackbar();
                    onClose();
                  })
                  .catch(error => {
                    console.log("Could not delete", error);
                  });
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });
  };

  render() {
    const { classes } = this.props;
    const {
      unidentifiedData,
      familyData,
      order,
      orderBy,
      selected,
      selectedFamilyMember,
      rowsPerPage,
      page
    } = this.state;

    const itemToEdit = this.returnDocumentToEdit(this.state.selected[0]);

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, unidentifiedData.length - page * rowsPerPage);

    const emptyRowsFamilyTable =
      rowsPerPage -
      Math.min(rowsPerPage, familyData.length - page * rowsPerPage);

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <FamilyMemberTableToolbar
            numSelectedFamilyMember={selectedFamilyMember.length}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <FamilyMemberTableHead
                numSelectedFamilyMember={selectedFamilyMember.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClickFamilyData}
                onRequestSort={this.handleRequestSort}
                rowCount={familyData.length}
              />
              <TableBody>
                {stableSort(familyData, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelectedFamilyMember = this.isSelectedFamilyMember(
                      n._id
                    );
                    return (
                      <TableRow
                        hover
                        onClick={event =>
                          this.handleClickFamilyMember(event, n._id)
                        }
                        role="checkbox"
                        aria-checked={isSelectedFamilyMember}
                        tabIndex={-1}
                        key={n._id}
                        selectedFamilyMember={isSelectedFamilyMember}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelectedFamilyMember} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.firstName}
                        </TableCell>
                        <TableCell align="right">{n.lastName}</TableCell>
                        <TableCell align="right">{n.age}</TableCell>
                        <TableCell align="right">{n.gender}</TableCell>
                        <TableCell align="right">{n.email}</TableCell>
                        <TableCell align="right">{n.phone}</TableCell>
                        <TableCell align="right">{n.location}</TableCell>
                        <TableCell align="right">{n.relationship}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRowsFamilyTable > 0 && (
                  <TableRow style={{ height: 29 * emptyRowsFamilyTable }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={familyData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        {/**************/}
        <Paper className={classes.root}>
          <UnidentifiedTableToolbar
            numSelected={selected.length}
            checkedItems={selected}
            itemToEdit={itemToEdit}
            addItemToFamilyMember={this.addItemToFamilyMember}
            unSelectItems={this.unSelectItems}
            confirmDeleteCustom={this.confirmDeleteCustom}
            updateFamilyMemberState={this.updateFamilyMemberState}
            updateUnidentifiedMemberState={this.updateUnidentifiedMemberState}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <UnidentifiedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={unidentifiedData.length}
              />
              <TableBody>
                {stableSort(unidentifiedData, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n._id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n._id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n._id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.firstName}
                        </TableCell>
                        <TableCell align="right">{n.lastName}</TableCell>
                        <TableCell align="right">{n.age}</TableCell>
                        <TableCell align="right">{n.gender}</TableCell>
                        <TableCell align="right">{n.email}</TableCell>
                        <TableCell align="right">{n.phone}</TableCell>
                        <TableCell align="right">{n.location}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 29 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={unidentifiedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <div id="snackbar">
          The Commodity you selected has been successfully deleted
        </div>
      </React.Fragment>
    );
  }
}

FamiltyMemberTables.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FamiltyMemberTables);

/*

 {console.log("FILE DATA IS ", unidentifiedData)}
 {console.log(
    "DATA PASSED FROM PARENT ",
    this.props.location.state.data
  )}

  */
