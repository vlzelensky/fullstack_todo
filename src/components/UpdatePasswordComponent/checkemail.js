import React from "react";
import { withRouter } from "react-router";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import ChangePassComponent from "./changepass";
import api from "../../services/api";

class CheckEmailComponent extends React.Component {
  state = {
    email: "",
    renderFlag: true,
    warning: false,
    warningMessage: "",
    vertical: "top",
    horizontal: "center",
  };

  changeRenderFlag = () => {
    this.setState((state) => ({ renderFlag: !state.renderFlag }));
  };

  renderLogin = () => {
    this.props.history.push("/login");
  };

  checkEmail = async () => {
    const emailSample = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (this.state.email === "") {
      return;
    }
    if (!emailSample.test(this.state.email)) {
      this.setState({ warningMessage: "Enter a valid email adress" });
      this.setState({ warning: true });
      return;
    }
    try {
      await api()
        .post("/api/check_email", {
          email: this.state.email,
        })
        .then((res) => {
          if (res.status !== 201) {
            throw new Error(res.status);
          } else {
            this.changeRenderFlag();
          }
        })
        .catch((e) => {
          this.setState({ warningMessage: "This user doesn't exist" });
          this.setState({ warning: true });
        });
    } catch (e) {
      console.warn(e);
    }
  };

  handleClose = () => {
    this.setState({ warning: false });
  }

  renderCheckEmail() {
    const {vertical, horizontal, warningMessage, warning} = this.state
    return (
      <div>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={warning}>
          <Alert onClose={this.handleClose} severity="error">
            {warningMessage}
          </Alert>
        </Snackbar>
        <h1>change password</h1>
        <div className="main-box">
          <div className="field">
            <TextField
              variant="outlined"
              autoComplete="off"
              id="standard-basic"
              label="Enter your email"
              className="form"
              onChange={(event) =>
                this.setState({ email: event.target.value.trim() })
              }
              value={this.state.email}
            />
            <div className="btns">
              <Button
                variant="contained"
                color="default"
                className="btn"
                onClick={this.renderLogin}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="default"
                className="btn"
                onClick={this.checkEmail}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { renderFlag } = this.state;
    return (
      <>
        {renderFlag ? (
          this.renderCheckEmail()
        ) : (
          <ChangePassComponent changeRenderFlag={this.changeRenderFlag} />
        )}
      </>
    );
  }
}

export default withRouter(CheckEmailComponent);
