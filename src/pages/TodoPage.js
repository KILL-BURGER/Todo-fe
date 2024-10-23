import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const TodoPage = ({setUser}) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const navigate = useNavigate();

  // 할일 목록을 불러온다.
  const getTasks = async () => {
    const response = await api.get('/tasks');
    // console.log('taskList', response.data.data);
    setTodoList(response.data.data.reverse());
  };

  // 할일을 추가한다.
  const addTask = async () => {
    try {
      const response = await api.post('/tasks', { task: todoValue, isComplete: false });
      if (response.status === 200) {
        // console.log('성공');
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
      const response = await api.put(`/tasks/${id}`, { isComplete: !task.isComplete });
      if (response.status === 200) {
        // console.log('성공');
        getTasks();
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  // 할일 삭제.
  const deleteTask = async (id) => {
    try {
      // console.log('id', id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    console.log('로그아웃');
    sessionStorage.clear(); // 세션 스토리지 초기화
    setUser(null);
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

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
      <Row>
        <Col xs={12} sm={10}>
          <button className="button-logout" onClick={logout}>로그아웃</button> {/* 로그아웃 버튼 */}
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
