import React from "react";
import axios from "axios";
import {
  Button,
  TextField,
  DialogTitle,
  Dialog,
  Checkbox,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tasks from "./tasks.js";
import EditTasks from "./editTasks";
import "./index.css";

class EditTodoPage extends React.Component {
  state = {
    list: {},
    isLoading: true,
    editMode: false,
  };

  componentDidMount = () => {
    this.getTodoList();
  };

  saveChanges = async (res) => {
    const { list, tasks } = this.state.list;
    const listId = this.props.match.params.id;
    try {
      await axios.put("/api/editlist/" + listId, {
        list,
        tasks,
      });
      if (res.status !== 201) {
        throw new Error(res.status);
      }
    } catch (e) {
      console.log(e);
    }
    this.props.history.push("/todo");
  };

  activateEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  // changeTitle = (event) => {
  //   console.log(this.state.list.list.title)
  //   this.setState({ list: { list: {title: event.target.value.trim()}}})
  // };

  handleClose = () => {
    this.setState({ editMode: false });
  };

  changeTaskText = (text, i) => {
    const { tasks } = this.state.list;
    this.setState({
      tasks: tasks.map((e, index) => (index === i ? (e.text = text) : e)),
    });
  };

  changeTaskChecked = (checked, i) => {
    const { tasks } = this.state.list;
    this.setState({
      tasks: tasks.map((e, index) => (index === i ? (e.checked = checked) : e)),
    });
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

  deleteList = async () => {
    const listId = this.props.match.params.id;
    try {
      await axios.delete("/api/editlist/" + listId);
      this.props.history.push("/todo");
    } catch (e) {
      console.error(e);
    }
  };

  deleteTask = async (id) => {
    try {
      await axios.delete("/api/deletetask/" + id);
      this.getTodoList();
    } catch (e) {
      console.error(e);
    }
  };

  addNewTask = (event) => {
    const idList = this.props.match.params.id
    if (event.key === "Enter") {
      let { tasks } = this.state.list;
      console.log(tasks)
      const value = event.target.value.trim()
      this.setState((state) => {
        tasks.push({
          text: value,
          checked: false,
          id_list: idList
        });
      });
      event.preventDefault();
      event.target.value = ""
    }
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
                  <Button
                    onClick={this.changeTaskText}
                    color="default"
                    className="open-menu"
                  >
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
      const { tasks } = this.state.list;
      const { title } = this.state.list.list;
      const { editMode } = this.state;
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
                <h1>{title}</h1>
                <div className="buttons">
                  <Button onClick={this.activateEditMode}>Edit</Button>
                  <Button onClick={this.deleteList}>Delete</Button>
                </div>

                <Tasks
                  deleteTask={this.deleteTask}
                  editMode={editMode}
                  changeTaskChecked={this.changeTaskChecked}
                  changeTaskText={this.changeTaskText}
                  tasks={tasks}
                />
                <div className="input">
                  <TextField
                    onKeyDown={this.addNewTask}
                  />
                </div>
                <Dialog
                  onClose={this.handleClose}
                  aria-labelledby="simple-dialog-title"
                  open={editMode}
                >
                  <DialogTitle id="simple-dialog-title">
                    <TextField
                      onChange={this.changeTitle}
                      value={title}
                    ></TextField>
                  </DialogTitle>
                  <EditTasks
                    changeTaskText={this.changeTaskText}
                    changeTaskChecked={this.changeTaskChecked}
                    editMode={editMode}
                    tasks={tasks}
                  />
                  <Button onClick={this.activateEditMode}>Cancel</Button>
                  <Button onClick={() => this.activateEditMode}>Save</Button>
                </Dialog>

                <div className="save-btn-container">
                  <Button
                    className="btn"
                    onClick={() => this.props.history.push("/todo")}
                  >
                    Cancel
                  </Button>
                  <Button onClick={this.saveChanges} className="btn">
                    Save
                  </Button>
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
