import React, { useEffect } from "react";
import "./App.css";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Login, Register, Home, Project } from "./components";
import { useSelector } from "react-redux";

function App() {
  const authState = useSelector((state) => state.auth);
  const [isAuth, setIsAuth] = React.useState(authState.isAuth);
  useEffect(() => {
    setIsAuth(authState.isAuth);
  }, [authState.isAuth]);
  return (
    <Router basename="/">
      <Switch>
        <Route path="/login">
          {!isAuth ? <Login /> : <Redirect to="/home"></Redirect>}
        </Route>
        <Route path="/register">
          {!isAuth ? <Register /> : <Redirect to="/home"></Redirect>}
        </Route>
        <Route path="/" exact>
          <Redirect to="/home"></Redirect>
        </Route>
        <Route path="/home">
          {isAuth ? <Home /> : <Redirect to="/login"></Redirect>}
        </Route>
        <Route path="/project">
          {isAuth ? <Project /> : <Redirect to="/login"></Redirect>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
