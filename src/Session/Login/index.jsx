import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { post } from "../../utilities/api"

const Login = () => {
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
        <div>
            <div>Log In</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit">Log In</button>
            </form>
            <div>
                Don't have an account?{" "}
                <NavLink to="/signup" className="link">
                    Sign Up
                </NavLink>
            </div>
        </div>
	);
}

export default Login;