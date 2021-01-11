import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";
import NewTask from "../NewListComponent/newtask";
import ChooseTitle from "../NewListComponent/chooser";
import Tasks from "./tasks.js";

class EditTodoPage extends React.Component {
  state = {
    list: {},
    isLoading: true,
  };

  componentDidMount = () => {
    this.getTodoList();
  };

  getTodoList = async () => {
    try {
      const listId = this.props.match.params.id;
      const res = await axios.get("/api/editlist/" + listId);
      this.setState({ list: res.data });
    } catch (e) {
      console.error(e);
    }
    this.setState({ isLoading: false });
  };

  render() {
    if (this.state.isLoading === true) {
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
              <div className="main-box">
                <CircularProgress />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
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
              <div className="main-box">
                <h1>{this.state.list.list.title}</h1>
                <Tasks tasks={this.state.list.tasks} />
                <div className="save-btn-container">
                  <Button className="btn">Save</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default EditTodoPage;
