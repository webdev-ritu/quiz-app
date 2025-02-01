import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token");
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <nav>
            <Link to="/">Home</Link>
            {isLoggedIn && <Link to="/Quiz">Quiz</Link>}
            {isLoggedIn && <Link to="/Result">Result</Link>}
            {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
            ):(
            <Link to="/login">Login</Link>
            )}
        </nav>
    );
};
export default Navbar;