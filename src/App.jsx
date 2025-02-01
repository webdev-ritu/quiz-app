import { BrowserRouter as Router,Routes,Route, Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import ProtectedRoute from "./components/ProtectedRoute";
 
function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem("token");
   setIsAuthenticated(!!token);
  },[]);
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
       <Route path="/Quiz" element={isAuthenticated ? <Quiz/> : <Navigate to="/login"/>}/>
        <Route path="/Result" element={isAuthenticated ? <Result/> : <Navigate to="/login"/>}/>
      </Routes>
    </Router>
  );
}
export default App;