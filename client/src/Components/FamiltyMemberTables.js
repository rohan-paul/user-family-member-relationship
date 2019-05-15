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
import data from "./familyData";
import FamilyMemberData from "./FamilyMemberData";
import { stableSort } from "./UtilFunctions/Utils";
import { getSorting } from "./UtilFunctions/Utils";
import UnidentifiedTableHead from "./UnidentifiedTableHead";
import UnidentifiedTableToolbar from "./UnidentifiedTableToolbar";
import FamilyMemberTableHead from "./FamilyMemberTableHead";
import FamilyMemberTableToolbar from "./FamilyMemberTableToolbar";

let counter = 0;

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
    orderBy: "calories",
    selected: [],
    selectedFamilyMember: [],
    data: data,
    familyData: [],
    page: 0,
    rowsPerPage: 5
  };

  componentDidMount() {
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

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
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
      this.setState(state => ({ selected: state.data.map(n => n._id) }));
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

  render() {
    const { classes } = this.props;
    const {
      data,
      familyData,
      order,
      orderBy,
      selected,
      selectedFamilyMember,
      rowsPerPage,
      page
    } = this.state;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const emptyRowsFamilyTable =
      rowsPerPage -
      Math.min(rowsPerPage, familyData.length - page * rowsPerPage);

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <FamilyMemberTableToolbar numSelected={selectedFamilyMember.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <FamilyMemberTableHead
                numSelected={selectedFamilyMember.length}
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
          <UnidentifiedTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <UnidentifiedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
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
            count={data.length}
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
      </React.Fragment>
    );
  }
}

FamiltyMemberTables.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FamiltyMemberTables);
