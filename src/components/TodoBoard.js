import React from "react";
import TodoItem from "./TodoItem";
import {useNavigate} from "react-router-dom";

const TodoBoard = ({todoList, updateComplete, deleteTask, index}) => {
  const navigate = useNavigate();



  return (
    <div>
        <h2 style={{display: "inline"}}>Todo List</h2>
      {todoList.length > 0
        ? todoList.map((item, index) => <TodoItem item={item}
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
