import React from 'react';


export default function Titles(props) {
    console.log(props.lists)
    return props.lists.map((list) => {
        return <div>{list.title}</div>
    })
}