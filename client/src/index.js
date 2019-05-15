import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import "react-table/react-table.css";

const Dashboard = () => {
  return <App />;
};

ReactDOM.render(<Dashboard />, document.getElementById("root"));

/*
const data = [
  {
    _id: "5cdc56878b9c427327ada12c",
    firstName: "Shirley ",
    lastName: "Louise",
    age: 27,
    gender: "female",
    email: "louiseholmes@sarasonic.com",
    phone: "+1 (976) 536-2680",
    location: "Olney"
  },
  {
    _id: "5cdc5687f6e223b1d409203d",
    firstName: "Rochelle ",
    lastName: "Howard",
    age: 21,
    gender: "male",
    email: "howardholmes@sarasonic.com",
    phone: "+1 (976) 534-3336",
    location: "Fedora"
  }
];
*/
