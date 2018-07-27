import '!style-loader!css-loader!sass-loader!./styles/app.scss';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {routes} from './routes';

ReactDOM.render(
  routes,
  document.getElementById("root")
);