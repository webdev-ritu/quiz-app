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
            const response = await axios.post("https://gaudy-feather-meadowlark.glitch.me/login", {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
           setIsAuthenticated(true);
           navigate("/quiz");
        } catch (error) {
            console.error("error while login", error);
        }
    };
    return (
        <div>
            <h1>Login</h1>
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