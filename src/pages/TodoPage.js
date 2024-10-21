import React, {useEffect, useState} from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  // 할일 목록을 불러온다.
  const getTasks = async () => {
    const response = await api.get('/tasks');
    // console.log('response', response);
    setTodoList(response.data.data.reverse());
  };

  // 할일을 추가한다.
  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {task: todoValue, isComplete: false});
      if (response.status === 200) {
        console.log('성공');
        setTodoValue('');
        // 새로고침 없이 데이터 반영
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  // 할일 상태 변경.
  const updateComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {isComplete: !task.isComplete});
      // console.log('response', response);
      if (response.status === 200) {
        console.log('성공');
        getTasks();
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  // 할일 삭제.
  const deleteTask = async (id) => {
    try {
      console.log('id', id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log('error', err);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="📚 할일을 적어주세요."
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        updateComplete={updateComplete}
        deleteTask={deleteTask}
      />
    </Container>
  );
};

export default TodoPage;