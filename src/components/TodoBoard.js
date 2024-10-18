import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({todoList, updateComplete, deleteTask, index}) => {
    return (
        <div>
            <h2>Todo List</h2>
            {todoList.length > 0
                ? todoList.map((item) => <TodoItem item={item}
                                                   key={index}
                                                   updateComplete={updateComplete}
                                                   deleteTask={deleteTask}/>)
                : <h2>There is no Item to show</h2>}
        </div>
    );
};

export default TodoBoard;
