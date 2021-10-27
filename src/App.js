import React, { useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
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
    <Router basename={process.env.PUBLIC_URL}>
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
          <Project />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
