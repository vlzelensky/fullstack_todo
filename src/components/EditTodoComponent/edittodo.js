import React from "react";
import axios from "axios";
import { Button, TextField, DialogTitle, Dialog } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MenuIcon from "@material-ui/icons/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tasks from "./tasks.js";
import EditTasks from "./editTasks";
import "./index.css";

class EditTodoPage extends React.Component {
  state = {
    list: {},
    tasks: {},
    tasksToSend: [],
    editing: [],
    editingTitle: "",
    isLoading: true,
    editMode: false,
  };

  addEditedTitle = (title) => {
    if (this.state.list.title === title) {
      this.setState({ editingTitle: "" });
    } else {
      this.setState({ editingTitle: title });
    }
  };

  addEditedChecked = (text, _id, checked) => {
    this.setState(({ editing, tasks }) => {
      const editingElement = editing.find((element) => element._id === _id);
      if (editingElement === undefined) {
        return {
          editing: [
            ...editing,
            {
              text,
              checked,
              _id,
              list_id: this.props.match.params.id,
            },
          ],
        };
      } else {
        const task = tasks.find((element) => element._id === _id);
        if (task.text === text && task.checked === checked) {
          return {
            editing: editing.filter((element) => element._id !== _id),
          };
        } else {
          return {
            editing: editing.map((element) =>
              element._id === _id ? { ...element, checked } : element
            ),
          };
        }
      }
    });
  };

  addEditedText = (text, _id, checked) => {
    this.setState(({ editing, tasks }) => {
      const editingElement = editing.find((element) => element._id === _id);
      if (editingElement === undefined) {
        return {
          editing: [
            ...editing,
            {
              text,
              checked,
              _id,
              list_id: this.props.match.params.id,
            },
          ],
        };
      } else {
        const task = tasks.find((element) => element._id === _id);
        if (task.text === text && task.checked === checked) {
          return {
            editing: editing.filter((element) => element._id !== _id),
          };
        } else {
          return {
            editing: editing.map((element) =>
              element._id === _id ? { ...element, text } : element
            ),
          };
        }
      }
    });
  };

  componentDidMount = () => {
    this.getTodoList();
  };

  saveChanges = async () => {
    const { editing, editingTitle } = this.state;
    const listId = this.props.match.params.id;

    try {
      if (editingTitle !== "") {
        const res = await axios.put("/api/editlist/" + listId, {
          editing,
          editingTitle,
        });
        if (res.status !== 201) {
          throw new Error(res.status);
        }
      }
    } catch (e) {
      console.log(e);
    }
    this.setState({ editMode: false });
    this.getTodoList();
  };

  activateEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  changeTitle = (event) => {
    this.setState((state) => ({
      list: { title: event.target.value },
    }));
  };

  handleClose = () => {
    this.setState({ editMode: false });
  };

  changeTaskText = (text, i) => {
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.map((e, index) => (index === i ? { ...e, text } : e)),
    });
  };

  changeTaskChecked = (checked, i) => {
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.map((e, index) => (index === i ? { ...e, checked } : e)),
    });
  };

  getTodoList = async () => {
    try {
      const listId = this.props.match.params.id;
      const res = await axios.get("/api/editlist/" + listId);
      this.setState({ list: res.data.list, tasks: res.data.tasks });
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

  addNewTaskOnEnter = async (event) => {
    const { id } = this.props.match.params;
    if (event.key === "Enter") {
      const value = event.target.value.trim();
      try {
        await axios.post("/api/tasks", {
          id_list: id,
          text: value,
          checked: false,
        });
        await this.getTodoList();
        event.target.value = "";

      } catch (e) {
        console.log(e);
      }
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
      const {
        editMode,
        tasks,
        list: { title },
      } = this.state;
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
                <div className="input-title">
                  <TextField
                    className="input-title-editlist"
                    value={title}
                    disabled
                  ></TextField>
                </div>

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
                <div className="new-task">
                  <TextField onKeyDown={this.addNewTaskOnEnter} />
                  <Button on Click={this.addnewTask}>
                    <AddBoxIcon />
                  </Button>
                </div>
                <Dialog
                  onClose={this.handleClose}
                  aria-labelledby="simple-dialog-title"
                  open={editMode}
                >
                  <DialogTitle id="simple-dialog-title">
                    <TextField
                      onChange={(event) =>
                        this.addEditedTitle(event.target.value)
                      }
                      defaultValue={title}
                    ></TextField>
                  </DialogTitle>
                  <EditTasks
                    addEditedChecked={this.addEditedChecked}
                    addEditedText={this.addEditedText}
                    changeTaskText={this.changeTaskText}
                    changeTaskChecked={this.changeTaskChecked}
                    editMode={editMode}
                    tasks={tasks}
                  />
                  <Button onClick={this.activateEditMode}>Cancel</Button>
                  <Button onClick={this.saveChanges}>Save</Button>
                </Dialog>

                <div className="save-btn-container">
                  <Button
                    className="btn"
                    onClick={() => this.props.history.push("/todo")}
                  >
                    Back
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
