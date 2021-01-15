import React, {Link} from 'react';


export default function Titles(props) {
    return props.lists.map((list) => {
        return <Link to={"/todo/"}>{list.title}</Link>
    })
}