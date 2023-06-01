import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { post } from "../../utilities/api"

const Login = ({ setFirstName }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logInUser = () => {
        const callback = (data) => {
            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.jwt);
                setFirstName(data.user.first_name);
                navigate("/");
            }
        };
    
        post("login", { session: {email: email, password: password}}, callback);
    };

	const handleSubmit = (e) => {
		e.preventDefault();
		logInUser();
		setEmail("");
        setPassword("");
	};

    return (
    <Form style={formStyle} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="text"
                placeholder="Email Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password} 
            />
        </Form.Group>
        <Button style={buttonStyle} variant="primary" type="submit">
            Submit
        </Button>
        <Form.Text>
            Don't have an account?{" "}
            <NavLink to="/signup" className="link">
                Sign Up
            </NavLink>
        </Form.Text>
    </Form>
  );
}

const formStyle = {
    margin: "8px",
  };
const buttonStyle = {
    marginRight: "8px",
}

export default Login;