import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./index.css";
import EditTodoPage from "../EditTodoComponent/edittodo";
import MainComponent from "./main.js";

class TodoComponent extends React.Component {
  
  render() {
    return ( 
      <BrowserRouter>
        <Switch>
          <Route path="/todo/:id" render={(props) => (
              <EditTodoPage
                getTodoTitles={this.props.getTodoTitles}
                {...props}
              />
            )} />
          <Route
            path="/todo"
            render={(props) => (
              <MainComponent
                getTodoTitles={this.props.getTodoTitles}
                user={this.props.user}
                location={props.location}
                match={props.match}
                history={props.history}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default TodoComponent;
