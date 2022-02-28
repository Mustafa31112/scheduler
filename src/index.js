import React from "react";
import ReactDOM from "react-dom";

import "index.scss";
import axios from "axios";
import Application from "components/Application";

axios.defaults.baseURL = "http://localhost:8001"

ReactDOM.render(<Application />, document.getElementById("root"));
