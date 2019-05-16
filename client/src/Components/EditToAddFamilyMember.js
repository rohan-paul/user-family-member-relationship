import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import history from "../history";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { styles } from "./commonStyles/AddNewItemStyles";
import theme from "./commonStyles/AddNewItemThemes";
import EmptyFieldSnackBar from "./Snackbars/EmptyFieldSnackBar";
import EditItemConfirmSnackbar from "./Snackbars/EditItemConfirmSnackbar";
import NewItemAddedConfirmSnackbar from "./Snackbars/NewItemAddedConfirmSnackbar";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem } from "material-ui/Menu";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

const relationshipNames = [
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Friend",
  "Colleague",
  "Cousin",
  "Nephew"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 550
    }
  }
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.imported_commodity_name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
    width: "100%"
  };
}

export class EditToAddFamilyMember extends Component {
  state = {
    open: false,
    openNewItemAddedConfirmSnackbar: false,
    openEmptyTextFieldSnackbar: false,
    vertical: "top",
    horizontal: "center",
    firstName: this.props.itemToEdit[0].firstName,
    lastName: this.props.itemToEdit[0].lastName,
    age: this.props.itemToEdit[0].age,
    email: this.props.itemToEdit[0].email,
    gender: this.props.itemToEdit[0].gender,
    location: this.props.itemToEdit[0].location,
    phone: this.props.itemToEdit[0].phone,
    arrowRef: null
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleFabOpen = () => {
    this.setState({ open: true });
  };

  closeNewItemConfirmSnackbar = () => {
    this.setState({ openNewItemAddedConfirmSnackbar: false });
    this.props.unSelectItems();
  };

  closeEmptyFieldSnackbar = () => {
    this.setState({ openEmptyTextFieldSnackbar: false }, () => {});
  };

  handleFormSubmit = () => {
    // const { addNewItemToParentState } = this.props;
    const {
      firstName,
      lastName,
      age,
      email,
      gender,
      location,
      phone,
      relationship
    } = this.state;
    if (
      firstName !== "" &&
      lastName !== "" &&
      age !== "" &&
      email !== "" &&
      gender !== "" &&
      location !== "" &&
      phone !== "" &&
      relationship !== ""
    ) {
      axios
        .post("/api/familymemberroute", {
          firstName,
          lastName,
          age,
          email,
          gender,
          location,
          phone,
          relationship
        })
        .then(() => {
          this.props.addItemToFamilyMember({
            firstName,
            lastName,
            age,
            email,
            gender,
            location,
            phone,
            relationship
          });
          this.setState({
            open: false,
            openNewItemAddedConfirmSnackbar: true,
            vertical: "top",
            horizontal: "center"
          });
          history.push("/votercircle");
        })
        .catch(error => {
          alert("Oops something wrong happened, please try again");
        });
    } else {
      this.setState({ openEmptyTextFieldSnackbar: true });
    }
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleEnterEscapeKeyPress = e => {
    if (e.key === "Enter") {
      this.handleFormSubmit();
    } else if (e.key === "Escape") {
      this.handleCancel();
    }
  };

  render() {
    const { classes } = this.props;

    const {
      firstName,
      lastName,
      age,
      email,
      gender,
      location,
      phone,
      relationship
    } = this.state;

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth={"sm"}
          variant="contained"
          PaperProps={{
            classes: {
              root: classes.paper
            }
          }}
          onKeyDown={this.handleEnterEscapeKeyPress}
        >
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.dialogTitleAdd}
          >
            <div className={classes.displayFlexDialogTitle}>
              <Typography variant="h5" className={classes.dialogTitleHeading}>
                Add Family Member Relationship
              </Typography>
              <IconButton
                onClick={this.handleToggle}
                style={{
                  float: "right"
                }}
                className={classes.button}
              >
                <CancelIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent required>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <TextField
                  select
                  required
                  autoFocus
                  error={relationship === ""}
                  value={relationship}
                  onChange={e => {
                    this.setState({
                      relationship: e.target.value
                    });
                  }}
                  input={<Input id="select-multiple" />}
                  menuprops={MenuProps}
                  classes={{
                    root: classes.space
                  }}
                  helperText={
                    relationship === ""
                      ? "Please enter the Relationship Name"
                      : " "
                  }
                  style={{ width: "540px" }}
                  InputProps={{
                    classes: {
                      underline: classes.underline
                    }
                  }}
                >
                  {relationshipNames.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </form>

            <TextField
              required
              autoFocus
              classes={{
                root: classes.space
              }}
              value={firstName}
              onChange={e =>
                this.setState({
                  firstName: e.target.value
                })
              }
              error={firstName === ""}
              helperText={firstName === "" ? "Please enter First Name" : " "}
              label="First Name"
              type="string"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.underline
                }
              }}
            />
            <TextField
              required
              autoFocus
              classes={{
                root: classes.space
              }}
              value={lastName}
              onChange={e =>
                this.setState({
                  lastName: e.target.value
                })
              }
              error={lastName === ""}
              helperText={lastName === "" ? "Please enter Last Name" : " "}
              label="Last Name"
              type="string"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.underline
                }
              }}
            />
            <TextField
              required
              autoFocus
              classes={{
                root: classes.space
              }}
              value={age}
              onChange={e =>
                this.setState({
                  age: e.target.value
                })
              }
              error={age === ""}
              helperText={age === "" ? "Please enter Age" : " "}
              label="Age"
              type="string"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.underline
                }
              }}
            />
            <TextField
              required
              autoFocus
              classes={{
                root: classes.space
              }}
              value={email}
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
              error={email === ""}
              helperText={email === "" ? "Please enter Email" : " "}
              label="Email"
              type="string"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.underline
                }
              }}
            />
            <TextField
              required
              autoFocus
              classes={{
                root: classes.space
              }}
              value={gender}
              onChange={e =>
                this.setState({
                  gender: e.target.value
                })
              }
              error={gender === ""}
              helperText={gender === "" ? "Please enter Gender" : " "}
              label="Gender"
              type="string"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.underline
                }
              }}
            />
            <TextField
              required
              autoFocus
              classes={{
                root: classes.space
              }}
              value={location}
              onChange={e =>
                this.setState({
                  location: e.target.value
                })
              }
              error={location === ""}
              helperText={location === "" ? "Please enter Location" : " "}
              label="Location"
              type="string"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.underline
                }
              }}
            />
            <TextField
              required
              autoFocus
              classes={{
                root: classes.space
              }}
              value={phone}
              onChange={e =>
                this.setState({
                  phone: e.target.value
                })
              }
              error={phone === ""}
              helperText={phone === "" ? "Please enter Phone" : " "}
              label="Phone"
              type="string"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.underline
                }
              }}
            />
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <div className={classes.displayFlexDialogActions}>
              <Button
                onClick={this.handleCancel}
                classes={{
                  root: classes.spaceDialogAction
                }}
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#ee0053"
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleFormSubmit}
                classes={{
                  root: classes.spaceDialogAction
                }}
                color="primary"
                variant="contained"
                size="large"
                type="submit"
                disabled={
                  firstName === "" ||
                  lastName === "" ||
                  age === "" ||
                  email === "" ||
                  gender === "" ||
                  location === "" ||
                  phone === "" ||
                  relationship === ""
                }
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </Dialog>
        <NewItemAddedConfirmSnackbar
          openNewItemAddedConfirmSnackbar={
            this.state.openNewItemAddedConfirmSnackbar
          }
          closeNewItemConfirmSnackbar={this.closeNewItemConfirmSnackbar}
        />

        <EmptyFieldSnackBar
          openEmptyTextFieldSnackbar={this.state.openEmptyTextFieldSnackbar}
          closeEmptyFieldSnackbar={this.closeEmptyFieldSnackbar}
        />
      </div>
    );
  }
}

// export default EditToAddFamilyMember;
export default withStyles(styles, { withTheme: true })(EditToAddFamilyMember);
