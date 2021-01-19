import React from "react";
import { withRouter } from "react-router";
import { Button, Link } from "@material-ui/core";
import "./index.css";
import NewTask from "./newtask.js";
import ChooseTitle from "./chooser";
import api from "../../services/api";

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

  saveTodoList = async (res) => {
    const { title, tasks } = this.state;
    if (Object.values(this.state).some((value) => !value)) {
      return;
    }
    try {
      await api().post("/api/todolist", {
        title,
        tasks,
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res.status);
      }
    } catch (e) {
      console.warn(e);
    }
    this.props.history.push("/todo");
    this.props.getTodoTitles();
  };

  saveTaskValue = (todoItem, i) => {
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.map((task, index) =>
        index === i ? (task = todoItem) : task
      ),
    });
  };

  changeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  saveNewTask = (event) => {
    const { tasks } = this.state;
    if (event.key === "Enter") {
      this.setState((state) =>
        tasks.push({
          text: "",
          checked: false,
        })
      );
    }
  };

  render() {
    return (
      <div onKeyDown={this.saveNewTask}>
        <div className="container">
          <div className="content">
            <div className="main-box new-list-box">
              <div className="title-container">
                <ChooseTitle
                  title={this.state.title}
                  changeTitle={this.changeTitle}
                />
              </div>
              <NewTask
                tasks={this.state.tasks}
                saveTaskValue={this.saveTaskValue}
              />
              <div className="save-btn-container">
                <Link href="/todo">
                  <Button onClick={this.saveTodoList}>Cancel</Button>
                </Link>

                <Button onClick={this.saveTodoList}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewListComponent);
