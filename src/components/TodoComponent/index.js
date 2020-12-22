import React from "react";
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "./index.css";
import TodoList from "./todoList";

class TodoComponent extends React.Component {
  render() {
    const todos = [];
    return (
      <div className="main">
        <div className="menu"></div>
        <div className="content">
          <div className="top-bar">
            <div className="logo">
              <Button color="default" className="open-menu">
                <MenuIcon />
              </Button>
              <h1>to-do lists</h1>
            </div>
            <div className="user">
              <h className="user-name">User Name</h>
              <Button variant="contained" color="default" className="btn">
                Log Out
              </Button>
            </div>
          </div>
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default TodoComponent;
