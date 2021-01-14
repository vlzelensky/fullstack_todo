import React from "react";
import { Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import axios from "axios";
import Lists from "./lists.js";
import Titles from "./titles.js"

class MainComponent extends React.Component {
  state = {
    lists: [],
    open: false,
  };

  editList = (id) => {
    this.props.history.push("/todo/" + id);
  };

  createNewList = () => {
    this.props.history.push("/new_list");
  };

  componentDidMount = () => {
    this.getTodoList();
  };

  getTodoList = async (res) => {
    try {
      const res = await axios.get("/api/todolist");
      this.setState({ lists: res.data });
    } catch (e) {
      console.warn(e.status);
    }
  };

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { lists, open } = this.state;

    return (
      <div className="main">
        <div className="container">
          <Drawer
            anchor="left"
            open={open}
            onClose={() => this.setState({ open: false })}
          >
            <div>IMAGE</div>
            <div className="titles">
              <Titles lists={lists} />
            </div>
          </Drawer>
          <div className="content">
            <div className="top-bar">
              <div className="logo">
                <Button
                  onClick={this.toggleDrawer}
                  color="default"
                  className="open-menu"
                >
                  <MenuIcon />
                </Button>
                <h1>to-do list</h1>
              </div>
              <div className="user">
                <h className="user-name">{this.props.userName}</h>
                <Button variant="contained" color="default" className="btn">
                  Log Out
                </Button>
              </div>
            </div>
            <div className="lists-container">
              <Lists editList={this.editList} lists={lists} />
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
      </div>
    );
  }
}

export default MainComponent;
