import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Link, Navigate, useNavigate} from "react-router-dom";
import api from "../utils/api";

const LoginPage = ({setUser, user}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/user/login', {email, password});
      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem('token', response.data.token);
        api.defaults.headers['authorization'] = "Bearer " + response.data.token;
        setError("");
        navigate('/');
      }
      throw new Error(response.message);
    } catch (err) {
      setError(err.message);
    }
  };

  console.log('user', user);

  if (user) {
    console.log('로그인됨 투두페이지로');
    return <Navigate to='/'/>
  }

  return (
    <div className="display-center">
      {error && <h1 className='red-error'>{error}</h1>}
      <Form className="login-box" onSubmit={handleLoginSubmit}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}/>
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="btn-dark">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register" className="register-text">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;