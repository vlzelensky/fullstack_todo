import React from 'react';
import { Link } from "@material-ui/core"


export default function Titles(props) {
    return props.lists.map((list) => {
        return <div className="drawerTitles">
            <Link onClick={() => console.log(list)} href={"/todo/" + list._id}>{list.title}</Link>
        </div>
    })
}