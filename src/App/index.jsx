import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Container from '../Container';
import Login from "../Session/Login";
import Signup from "../Session/Signup";

import { get } from "../utilities/api"

const App = () => {
  const navigate = useNavigate();

  const fetchUser = () => {
    const callback = (data) => {
        if (data.error) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
    };
  
    get("authorized", callback);
  };

  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Container />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App;