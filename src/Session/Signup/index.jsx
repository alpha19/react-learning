import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { post } from "../../utilities/api"

const Signup = () => {
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
        <div>
            <div>Sign Up</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
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
                <button type="submit">Sign Up</button>
            </form>
            <div className="alt">
                Already have an account?{" "}
                <NavLink to="/login" className="link">
                    Log in
                </NavLink>
            </div>
        </div>
    );
}

export default Signup;