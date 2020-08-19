const arrowGenerator = color => {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${color} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
};

module.exports = {
  styles: theme => ({
    palette: {
      primary: { main: "#9E9E9E" },
      secondary: { main: "#ee0053" },
      error: { main: "#ee0053" }
    },
    root: {
      width: "100%",
      background: "linear-gradient(45deg, #E91E63 30%, #FF8E53 90%)",
      marginTop: theme.spacing.unit * 10,
      backgroundColor: "#E0E0E0"
    },
    paper: {
      backgroundColor: "#F5F5F5",
      boxShadow: "none",
      overflow: "hidden"
    },
    table: {
      minWidth: 1020
    },
    button: {
      "&:hover": {
        backgroundColor: "transparent"
      },
      padding: 0
    },
    tableWrapper: {
      overflowX: "auto"
    },
    gutters: theme.mixins.gutters(),
    arrowPopper: arrowGenerator(theme.palette.common.black),
    arrow: {
      position: "absolute",
      fontSize: 6,
      width: "3em",
      height: "3em",
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: 0,
        height: 0,
        borderStyle: "solid"
      }
    },
    bootstrapPopper: arrowGenerator(theme.palette.common.black),
    bootstrapTooltip: {
      backgroundColor: theme.palette.common.black,
      paddingTop: "12px"
    },
    bootstrapPlacementLeft: {
      margin: "0 8px"
    },
    bootstrapPlacementRight: {
      margin: "0 8px"
    },
    bootstrapPlacementTop: {
      margin: "8px 0"
    },
    bootstrapPlacementBottom: {
      margin: "8px 0"
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: "#66CCFF"
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    space: {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4
    },
    spaceDialogAction: {
      marginTop: "auto",
      marginBottom: "auto",
      marginRight: theme.spacing.unit
    },
    fab: {
      margin: theme.spacing.unit * 4
    },
    extendedIcon: {
      marginRight: theme.spacing.unit
    },
    margin: {
      margin: theme.spacing.unit * 4
    },

    lightTooltip: {
      background: theme.palette.common.white,
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[1],
      fontSize: 16
    },
    close: {
      padding: theme.spacing.unit * 2,
      fontSize: 25
    },
    formControl: {
      margin: theme.spacing.unit,
      maxWidth: 300
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    textFieldDropDown: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginBottom: 0,
      width: 200
    },
    textFieldHMSHeading: {
      marginTop: theme.spacing.unit * 3
    },
    textFieldHMS: {
      marginTop: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 160
    },
    dateField: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginBottom: 0,
      width: 200
    },
    textFieldVPR: {
      marginTop: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    buttonMonth: {
      margin: theme.spacing.unit
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    notchedOutline: {
      border: "1px solid red"
    },
    overrides: {
      MuiOutlinedInput: {
        focused: {
          border: "1px solid #4A90E2"
        },
        "& $notchedOutline": {
          border: "1px solid #4A90E2"
        }
      }
    },
    underline: {
      "&:after": {
        borderBottomColor: "rgb(70, 197, 29)",
        borderWidth: "1px"
      }
    },
    fabButton: {
      position: "fixed",
      zIndex: 1,
      top: "auto",
      bottom: 0,
      marginBottom: 20,
      right: 20,
      margin: "0 auto"
    },
    //Below styles added by Harsha (Remove this comment when done)
    dialogTitleAdd: {
      height: "60px",
      padding: "14px"
    },
    dialogTitleEditLight: {
      height: "60px",
      padding: "14px",
      background: "#ffffff"
    },
    dialogTitleEditDark: {
      height: "60px",
      padding: "14px",
      background: "#424242"
    },
    displayFlexDialogTitle: {
      display: "flex",
      height: "30px",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    dialogTitleHeading: {
      height: "auto",
      margin: "auto 0"
    },
    dialogActions: {
      margin: 0,
      height: "60px"
    },
    displayFlexDialogActions: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end"
    }
  })
};

/*
  1> In above, the 'space' will control the vertical line spacing between TestFields and DatePicker inside the Dialog (i.e. inside AddNewDevelopmentWork component)

  And 'spaceDialogAction' will control the vertical space
   */
