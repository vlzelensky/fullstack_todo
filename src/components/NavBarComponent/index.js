import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";
import Titles from "../TodoComponent/titles"



export default function NavBar(props) {

    const user = props.user

    const [open, setOpen] = useState(false)

    async function getTodoList(res) {

    };



    function toggleDrawer() {
        setOpen(!open);
    };

    return (
        <div className="nav-bar">
            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
            >
                <div>IMAGE</div>
                <div className="titles">
                    <Titles lists={props.lists} />
                </div>
            </Drawer>
            <div className="top-bar">
                <div className="logo">
                    <Button
                        onClick={() => toggleDrawer()}
                        color="default"
                        className="open-menu"
                    >
                        <MenuIcon />
                    </Button>
                    <h1>to-do list</h1>
                </div>
                {user && 
                    <div className="user">
                        <h1 className="user-name">{user.firstName} {user.lastName}</h1>
                        <Button variant="contained" color="default" className="btn">
                            Log Out
                        </Button>
                    </div>
                }
            </div>

        </div>

    )
}