import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import TodoComponent from "./components/TodoComponent";
import CheckEmailComponent from "./components/UpdatePasswordComponent/checkemail";
import NewListComponent from "./components/NewListComponent/index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Redirect exact from="/" to="/login" />
        <Route path="/change_password" component={CheckEmailComponent} />
        <Route path="/todo/:todo" component={TodoComponent}>
          <Route path="/todo/:new_list" component={NewListComponent} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
