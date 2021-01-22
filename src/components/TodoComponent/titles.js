import React from 'react';
import { Link } from "@material-ui/core"


export default function Titles(props) {
    return props.titles.map((title) => {
        return <div key={title._id} className="drawer-titles">
            <Link href={"/todo/" + title._id}>{title.title}</Link>
        </div>
    })
}