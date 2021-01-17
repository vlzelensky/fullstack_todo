import React from "react";
import { Button } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import axios from "axios";
import Lists from "./lists.js";
import NavBar from "../NavBarComponent"
import api from "../../services/api"

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
      const res = await api().get("/api/todolist");
      this.setState({ lists: res.data });
    } catch (e) {
      console.warn(e.status);
    }
  };

  render() {
    const { lists, open } = this.state;

    return (
      <div className="main">
        <div className="container">
          
          <div className="content">
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
