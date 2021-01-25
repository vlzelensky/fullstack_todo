import React, { useState, useEffect } from "react";
import { Button, Link, Avatar } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import Titles from "../TodoComponent/titles";
import "./index.css";
import MD5 from "crypto-js/md5";
import navbarimage from "../../static/img/navbar.jpg";

export default function NavBar(props) {
  const user = props.user;
  const [open, setOpen] = useState(false);
  const [hashed, setHashed] = useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (user) {
      setHashed(MD5(user.email).toString());
    }
  }, [user]);

  // const openDashboard = () => {
  //   props.history.push("/todo")
  // }

  return (
    <div className="nav-bar">
      <Drawer
        className="drawer"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="img-container">
          {" "}
          <Link href={"/todo"}>
            <img
              onClick={() => console.log}
              className="drawer-img"
              alt=""
              src={navbarimage}
            ></img>
          </Link>
        </div>
        <Divider />
        <div className="titles">
          <Titles titles={props.titles} />
        </div>
        <Divider />
        <div className="addTodo-navbar">
          <Link href="/new_list">
            <Button className="btn">
              <AddCircleOutlineOutlinedIcon />
            </Button>
          </Link>
        </div>
        <Divider />
        {user && (
          <div className="user-container">
            <div className="avatar">
              <Avatar
                src={"https://www.gravatar.com/avatar/" + hashed}
              ></Avatar>
            </div>
            <div className="user">
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div>
              <Link className="edituser-btn" href="/userpage">
                <EditIcon />
              </Link>
            </div>
          </div>
        )}
      </Drawer>
      <div className="top-bar">
        <div className="logo">
          {user && (
            <div className="menu">
              <Button
                onClick={() => toggleDrawer()}
                color="default"
                className="btn"
              >
                <MenuIcon />
              </Button>
            </div>
          )}
          <div className="todo-logo">
            <Link href={"/todo"}>
              <h1>to-do list</h1>
            </Link>
          </div>
        </div>
        {user && (
          <div className="user">
            <Link href="/userpage">
              <span className="user-name">
                {user.firstName} {user.lastName}
              </span>
            </Link>
            <Button
              onClick={() => props.logOut()}
              variant="contained"
              color="default"
              className="btn"
            >
              Log Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
