import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Container from '../Container';
import MainNav from '../Navbar';
import Login from "../Session/Login";
import Signup from "../Session/Signup";

import { get } from "../utilities/api"

const App = () => {
  // TODO: I do NOT like this so change soon...
  // setFirstName is being used to "force" re-rendering of the navigation bar..
  // It's not a good practice and very "hacky".. Need to fix. Only allowing it
  // right now cause I'm focused on just getting something up and running.
  const [firstName, setFirstName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const callback = (data) => {
          if (data.error) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
          }
          
          setFirstName(data.first_name);
      };
    
      get("authorized", callback);
    };

    fetchUser();
  },[firstName, navigate]);

  return (
    <div>
      <MainNav
        firstName={firstName}
        setFirstName={setFirstName}
        />
      <Routes>
        <Route exact path="/" element={<Container />} />
        <Route exact path="/login" element={<Login setFirstName={setFirstName} />} />
        <Route exact path="/signup" element={<Signup setFirstNameTitle={setFirstName} />} />
      </Routes>
    </div>
  )
}

export default App;