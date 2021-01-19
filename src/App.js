/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoginComponent from "./components/LoginComponent";
import TodoComponent from "./components/TodoComponent";
import CheckEmailComponent from "./components/UpdatePasswordComponent/checkemail";
import NewListComponent from "./components/NewListComponent/index";
import NavBar from "./components/NavBarComponent";
import UserPageComponent from "./components/UserPageComponent"
import { initApi } from "./services/api";
import axios from "axios";
import api from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState(null);
  function saveUser(user) {
    setUser(user);
    localStorage.setItem("jwtToken", user.token);
    initApi(user.token);
  }

  function logOut() {
    setUser(null);
    localStorage.removeItem("jwtToken");
  }

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get("/api/user", {
          headers: {
            "x-token": token,
          },
        })
        .then((res) => {
          setUser(res.data);
          console.log(res.data)
          initApi(token);
          setLoading(false);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      setLoading(false);
    }
  }, []);

  async function getTodoTitles() {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const res = await api().get("/api/todolist", {
          headers: {
            "x-token": token,
          },
        });
        setTitles(res.data);
      } catch (e) {
        console.warn(e.status);
      }
    }
  }

  useEffect(() => {
    getTodoTitles();
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <BrowserRouter>
        <NavBar user={user} titles={titles} logOut={logOut} />
        <Switch>
          <Route
            path="/login"
            render={(props) => <LoginComponent onLogin={saveUser} {...props} />}
          />
          {!user && <Redirect to="/login" />}

          <Route path="/change_password" component={CheckEmailComponent} />
          <Route
            path="/todo"
            render={(props) => (
              <TodoComponent getTodoTitles={getTodoTitles} {...props} />
            )}
          />
          <Route
            path="/new_list"
            render={(props) => (
              <NewListComponent {...props} getTodoTitles={getTodoTitles} />
            )}
          />
          <Route
            path="/userpage"
            render={(props) => <UserPageComponent {...props} user={user} />}
          />
          <Redirect exact from="/" to="/todo" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
