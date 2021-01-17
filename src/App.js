/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoginComponent from "./components/LoginComponent";
import TodoComponent from "./components/TodoComponent";
import CheckEmailComponent from "./components/UpdatePasswordComponent/checkemail";
import NewListComponent from "./components/NewListComponent/index";
import NavBar from "./components/NavBarComponent"
import { initApi } from "./services/api"
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  function saveUser(user) {
    setUser(user)
    localStorage.setItem("jwtToken", user.token)
    initApi(user.token)
  }

  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    if (token) {
      axios.get("/api/user", {
        headers: {
          "x-token": token
        }
      })
        .then((res) => {
          setUser(res.data)
          initApi(token)
          setLoading(false)
        })
        .catch(e => {
          alert(e)
        })
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <CircularProgress />
    )
  } else {

    return (
      <BrowserRouter>
        <NavBar user={user} />
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <LoginComponent
                onLogin={saveUser}
                {...props}
              />
            )}
          />
          {!user && <Redirect to="/login" />}

          <Route path="/change_password" component={CheckEmailComponent} />
          <Route
            path="/todo"
            render={(props) => (
              <TodoComponent
                user={user}
                {...props}
              />
            )}
          />
          <Route path="/new_list" component={NewListComponent} />
          <Redirect exact from="/" to="/todo" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
