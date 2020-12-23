import React from "react";
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "./index.css";

class NewListComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="menu"></div>
          <div className="content">
            <div className="top-bar">
              <div className="logo">
                <Button color="default" className="open-menu">
                  <MenuIcon />
                </Button>
                <h1>new to-do list</h1>
              </div>
              <div className="user">
                <h className="user-name">User Name</h>
                <Button variant="contained" color="default" className="btn">
                  Log Out
                </Button>
              </div>
            </div>
            <div>
                <div>
                    <TodoTitle/>
                </div>
                <div>
                    <TodoTask/>
                </div>
                <div>
                    <TodoTask/>
                </div>
                <div>
                    <TodoTask/>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewListComponent;
