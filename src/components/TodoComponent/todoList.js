import React from "react";
import TodoItem from "./todoitem"

export default function TodoList (props) {
    return <div>{props.todos.map(todoitem => {        
        return (
            <div className="main-box">{todoitem.text}</div>
        )
    })}</div>;
}

