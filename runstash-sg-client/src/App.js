import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import jwtDecode from "jwt-decode";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Material UI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import User from "./pages/user";

// components
import Navbar from "./components/layout/Navbar";

// util
import customTheme from "./util/customTheme";
import AuthRoute from "./util/AuthRoute";
import axios from "axios";

axios.defaults.baseURL =
  "https://us-central1-runstash-sg.cloudfunctions.net/api";

const theme = createMuiTheme(customTheme);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className='App'>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <AuthRoute exact path='/login' component={Login} />
                <AuthRoute exact path='/signup' component={Signup} />
                <Route exact path='/user/:username' component={User} />
                <Route
                  exact
                  path='/user/:username/profile/:profileId'
                  component={User}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
