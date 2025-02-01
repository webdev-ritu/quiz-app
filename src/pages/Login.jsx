import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({setIsAuthenticated}) => {
   const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://equatorial-cloud-kilogram.glitch.me/login", {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
           setIsAuthenticated(true);
           navigate("/quiz");
        } catch (error) {
            console.error("error while login", error);
        }
    };
    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default Login;