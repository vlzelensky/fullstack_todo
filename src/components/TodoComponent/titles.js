import React from 'react';


export default function Titles(props) {
    return props.lists.map((list) => {
        return <div>{list.title}</div>
    })
}