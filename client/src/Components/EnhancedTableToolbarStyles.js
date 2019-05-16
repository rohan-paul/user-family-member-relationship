import { lighten } from "@material-ui/core/styles/colorManipulator";

function arrowGenerator(color) {
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
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 8
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
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
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

export default toolbarStyles;

/*
age: 27
email: "louiseholmes@sarasonic.com"
firstName: "Shirley "
gender: "female"
lastName: "Louise"
location: "Olney"
phone: "+1 (976) 536-2680"
_id: "5cdc56878b9c427327ada12c"

*/
