import React from "react";
import TodoItem from "./TodoItem";
import {Spinner} from "react-bootstrap";

const TodoBoard = ({todoList, updateComplete, deleteTask, index}) => {
    return (
        <div>
            <h2>Todo List</h2>
            <div className='box'>
                {todoList.length > 0
                    ? todoList.map((item) => <TodoItem item={item}
                                                       key={index}
                                                       updateComplete={updateComplete}
                                                       deleteTask={deleteTask}/>)
                    : <Spinner />}
            </div>

        </div>
    );
};

export default TodoBoard;
