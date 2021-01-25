import React from "react";
import { withRouter } from "react-router";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { TextField, Button } from "@material-ui/core";
import api from "../../services/api"

class ChangePassComponent extends React.Component {
  state = {
    newPassword: "",
    repeatNewPassword: "",
    renderFlag: true,
    warning: false,
    warningMessage: "",
    vertical: "top",
    horizontal: "center",
  };

  handleClose = () => {
    this.setState({ warning: false });
  }

  changePassword = async () => {
    const passwordSample = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    if (!passwordSample.test(this.state.newPassword)) {
      this.setState({
        warningMessage:
          "Password must contain only latin letters, at least 1 uppercase letter, 1 lowercase letter, 1 numeral",
      });
      this.setState({ warning: true });
      return;
    }
    if (Object.values(this.state).some((value) => value === "")) {
      return;
    }
    if (this.state.newPassword.length < 6) {
      this.setState({
        warningMessage: "Password length must be more than 6 characters",
      });
      this.setState({ warning: true });
      return;
    }
    if (this.state.newPassword === this.state.repeatNewPassword) {
      try {
        await api()
          .put("/api/change_password", {
            email: this.state.email,
            newPassword: this.state.newPassword,
          })
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error(res.status);
            } else {
              this.props.history.push("/todo");
            }
          })
          .catch((e) => {
            alert(e + ", try again later");
          });
      } catch (e) {
        console.warn(e);
      }
    } else {
      this.setState({ warningMessage: "Passwords don't match" });
      this.setState({ warning: true });
    }
  };

  render() {
    const { vertical, horizontal, warningMessage, warning } = this.state;
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
              type="password"
              variant="outlined"
              label="New password"
              className="form"
              onChange={(event) =>
                this.setState({ newPassword: event.target.value.trim() })
              }
              value={this.state.newPassword}
            />
          </div>
          <div className="field">
            <TextField
              type="password"
              variant="outlined"
              label="Repeat password"
              className="form"
              onChange={(event) =>
                this.setState({ repeatNewPassword: event.target.value.trim() })
              }
              value={this.state.repeatNewPassword}
            />
          </div>
          <div className="btns">
            <Button
              variant="contained"
              color="default"
              className="btn"
              onClick={this.props.changeRenderFlag}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="default"
              className="btn"
              onClick={this.changePassword}
            >
              Change password
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ChangePassComponent);
