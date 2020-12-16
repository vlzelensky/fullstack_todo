import React from "react";
import axios from "axios";
class RegisterComponent extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  saveUserData = async () => {
    if (Object.values(this.state).some((value) => value === "")){
        return;
    }
    if (this.state.password === this.state.repeatPassword) {
      try {
        await axios.post("/api/user", {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        });
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
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
        <h1>registration</h1>
        <div className="first-name">
          <span>First name</span>
          <input
            className="input"
            onChange={(event) =>
              this.setState({ firstName: event.target.value.trim() })
            }
            value={this.state.firstName}
            placeholder="First name"
          ></input>
        </div>
        <div className="second-name">
          <span>Second name</span>
          <input
            className="input"
            onChange={(event) =>
              this.setState({ lastName: event.target.value.trim() })
            }
            value={this.state.lastName}
            placeholder="Second name"
          ></input>
        </div>
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
              this.setState({ password: event.target.value.trim() })
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
              this.setState({ repeatPassword: event.target.value.trim() })
            }
            placeholder="Repeat password"
            value={this.state.repeatPassword}
            type="password"
          ></input>
        </div>
        <div className="btns">
          <button
            id="123123"
            className="btn1"
            onClick={this.props.changeStatus}
          >
            Back
          </button>
          <button className="btn1" onClick={this.saveUserData}>
            Create account
          </button>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
