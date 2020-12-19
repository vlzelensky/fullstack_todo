import React from "react";
import { withRouter } from "react-router";
import axios from "axios";

class UpdatePasswordComponent extends React.Component {
  state = {
    email: "",
    newPassword: "",
    repeatNewPassword: "",
  };
  
  renderLogin = () => {
    this.props.history.push('/login');
  }
  
  changePassword = async () => {
    if (Object.values(this.state).some((value) => value === "")) {
      return;
    }
    if (this.state.newPassword === this.state.repeatNewPassword) {
      try {
        await axios
          .put("/api/change_password", {
            email: this.state.email,
            newPassword: this.state.newPassword
          })
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error(res.status);
            } else {
                this.props.history.push('/login');
            }
          })
          .catch((e) => {
            alert(e + ", try again later");
          });
      } catch (e) {
        console.warn(e);
      }
    } else {
      alert("passwords don't match");
    }
  };

  render() {
    return (
      <div className="main-box">
        <h1>change password</h1>
        <div className="email">
          <span>Email</span>
          <input
            className="input"
            onChange={(event) =>
              this.setState({ email: event.target.value.trim() })
            }
            value={this.state.email}
            placeholder="Email"
          ></input>
        </div>
        <div className="password">
          <span>Password</span>
          <input
            className="input"
            onChange={(event) =>
              this.setState({ newPassword: event.target.value.trim() })
            }
            placeholder="Password"
            value={this.state.password}
            type="password"
          ></input>
        </div>
        <div className="password">
          <span>Repeat Password</span>
          <input
            className="input"
            onChange={(event) =>
              this.setState({ repeatNewPassword: event.target.value.trim() })
            }
            placeholder="Repeat password"
            value={this.state.repeatNewPassword}
            type="password"
          ></input>
        </div>
        <div className="btns">
          <button
            id="123123"
            className="btn1"
            onClick={this.renderLogin}
          >
            Back
          </button>
          <button className="btn1" onClick={this.changePassword}>
            Change password
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdatePasswordComponent);
