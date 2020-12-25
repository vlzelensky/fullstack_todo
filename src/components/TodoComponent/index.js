import React from "react";
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import "./index.css";

class TodoComponent extends React.Component {
  createNewList = () => {
    this.props.history.push("/new_list");
  };

  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="menu"></div>
          <div className="content">
            <div className="top-bar">
              <div className="logo">
                <Button color="default" className="open-menu">
                  <MenuIcon />
                </Button>
                <h1>to-do list</h1>
              </div>
              <div className="user">
                <h className="user-name">User Name</h>
                <Button variant="contained" color="default" className="btn">
                  Log Out
                </Button>
              </div>
            </div>
            <Button
              className="addTodo"
              variant="contained"
              color="default"
              onClick={this.createNewList}
            >
              <AddCircleOutlineOutlinedIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoComponent;
