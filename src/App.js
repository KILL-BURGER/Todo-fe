import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes} from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./route/PrivateRoute";
import {useEffect, useState} from "react";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await api.get('/user/me');
        setUser(response.data.user);
      }
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute user={user}>
          <TodoPage setUser={setUser}/>
        </PrivateRoute>}/>
      <Route path="/register" element={<RegisterPage/>}/>

      <Route path="/login" element={<LoginPage setUser={setUser} user={user}/>}/>
    </Routes>
  );
}

export default App;
