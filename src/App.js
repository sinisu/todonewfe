import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [user,setUser] = useState(null);

  // 토큰을 통해 유저 정보를 가져온다
  const getUser = async()=>{
    try{
      // 로그인 페이지에서 token에 저장했으므로 token으로 가져옴!
      const storedToken = sessionStorage.getItem('token');
      if(storedToken){
        const response = await api.get('/user/me');
        setUser(response.data.user);
      }
    }catch(error){
      setUser(null);
    }
  };

  useEffect(()=>{
    getUser()
  },[])

  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute user={user}>
          <TodoPage />
        </PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
    </Routes>
  );
}

export default App;
