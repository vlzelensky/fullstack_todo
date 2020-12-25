import React from "react";
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "./index.css";
import NewTask from "./newtask.js";
import ChooseTitle from "./chooser";

class NewListComponent extends React.Component {
  state = {
    title: "",
    tasks: [
      {
        text: "",
        checked: false,
      },
    ],
  };

  changeTitle = (event) => {
    this.setState({title: event.target.value.trim()})
  };

  saveNewTask = (event) => {
    if (event.key === "Enter") {
      this.setState((state) => this.state.tasks.push({}));
      console.log(this.state);
    }
  };

  render() {
    return (
      <div onKeyDown={this.saveNewTask}>
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
                <span className="user-name">User Name</span>
                <Button variant="contained" color="default" className="btn">
                  Log Out
                </Button>
              </div>
            </div>
            <div className="main-box">
              <div>
                <ChooseTitle title={this.state.title} changeTitle={this.changeTitle} />
              </div>
              <NewTask
                testFunction={this.testFunction}
                tasks={this.state.tasks}
              />
              <div>
                <Button onClick={this.saveNewList}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewListComponent;
