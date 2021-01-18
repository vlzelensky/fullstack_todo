import React, { useState } from "react";
import { Button, Link } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import Titles from "../TodoComponent/titles";
import "./index.css";

export default function NavBar(props) {
  const user = props.user;

  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <div className="nav-bar">
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div>IMAGE</div>
        <div className="titles">
          <Titles titles={props.titles} />
        </div>
      </Drawer>
      <div className="top-bar">
        <div className="logo">
          {user && (
            <Button
              onClick={() => toggleDrawer()}
              color="default"
              className="open-menu"
            >
              <MenuIcon />
            </Button>
          )}

          <Link href={"/todo"}>
            <h1>to-do list</h1>
          </Link>
        </div>
        {user && (
          <div className="user">
            <span className="user-name">
              {user.firstName} {user.lastName}
            </span>
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
