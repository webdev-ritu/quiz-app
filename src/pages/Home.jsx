import {Link} from "react-router-dom";
 const Home = () =>{
    return (
        <div className="container">
            <h1>Welcome to the Quiz App!</h1>
            <Link to="/login"> Please Login</Link>
        </div>
    );
 };

 export default Home;
