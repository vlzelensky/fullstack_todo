import React from "react";
import { Button, Link } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import Lists from "./lists.js";
import api from "../../services/api";

class MainComponent extends React.Component {
  state = {
    lists: [],
    open: false,
    loading: true,
  };

  editList = (id) => {
    this.props.history.push("/todo/" + id);
  };


  componentDidMount = () => {
    this.getTodoList();
    this.props.getTodoTitles();
  };

  getTodoList = async (res) => {
    try {
      const res = await api().get("/api/todolist");
      this.setState({ lists: res.data });
      this.setState({loading: false})
    } catch (e) {
      console.warn(e.status);
    }
  };

  render() {
    const { lists } = this.state;

    if (this.state.loading) {
      return (
        <CircularProgress/>
      )
    }
    return (
      <div className="main">
        <div className="container">
          <div className="content">
            <div className="lists-container">
              <Lists editList={this.editList} lists={lists} />
              <Link href="/new_list"><Button
                className="addTodo"
                variant="contained"
                color="default"
              >
                <AddCircleOutlineOutlinedIcon />
              </Button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainComponent;
