import green from "@material-ui/core/colors/green";
const styles = {
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {},
  card: {
    height: "500px",
    width: "700px"
  },
  media: {
    height: 100,
    width: 100,
    margin: "0px auto 0px auto"
  },
  cardHeader: {
    backgroundColor: "rgb(80,80,80)",
    padding: "10px",
    textAlign: "center"
  },
  title: {
    width: "100%",
    height: "45px",
    margin: "0 auto 0px auto",
    padding: "0px",
    fontSize: "25px",
    color: "white"
  },
  circularIcon: {
    height: 50,
    width: 50
  },
  checkBoxSizeIcon: {
    width: 25,
    height: 35
  },
  loginPaper: {
    height: "700px",
    width: "500px",
    margin: "50px auto"
  },
  paperFooter: {
    height: "25px",
    margin: "22px 0 0 141px",
    width: "100%",
    fontWeight: "bold"
  },
  label: {
    fontSize: "20px"
  },
  fab: {
    margin: "25px",
    width: "80px",
    height: "80px"
  }
};

export default styles;
