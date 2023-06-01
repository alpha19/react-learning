import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { post } from "../../utilities/api"

const Signup = ({ setFirstNameTitle }) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = () => {
        const callback = (data) => {
            if (data.error) {
                const errorMsg = data.error[Object.keys(data.error)][0];
                alert(errorMsg);
            } else {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.jwt);
                setFirstNameTitle(data.user.first_name);
                navigate("/");
            }
        };
    
        post(
            "signup", 
            { user: { first_name: firstName, last_name: lastName, email: email, password: password } },
            callback
        );
    };

	const handleSubmit = (e) => {
		e.preventDefault();
		createUser();
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
	};

    return (
        <Form style={formStyle} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
            </Form.Group>
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
            Already have an account?{" "}
                    <NavLink to="/login" className="link">
                        Log in
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

export default Signup;