/*eslint-disable*/

import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import TodoComponent from "./components/TodoComponent";
import CheckEmailComponent from "./components/UpdatePasswordComponent/checkemail";
import NewListComponent from "./components/NewListComponent/index";

function App() {
  const [userName, setUserName] = useState();
  function saveUserName(firstName, lastName) {
    setUserName(firstName + " " + lastName);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <LoginComponent
              saveUserName={saveUserName}
              location={props.location}
              match={props.match}
              history={props.history}
            />
          )}
        />
        <Redirect exact from="/" to="/login" />
        <Route path="/change_password" component={CheckEmailComponent} />
        <Route
          path="/todo"
          render={(props) => (
            <TodoComponent
              userName={userName}
              location={props.location}
              match={props.match}
              history={props.history}
            />
          )}
        />
        <Route path="/new_list" component={NewListComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
