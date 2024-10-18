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
                :
                <div className='box'>
                    <h1>할일을 입력해주세요. 😄</h1>
                </div>
            }
        </div>
    );
};

export default TodoBoard;
