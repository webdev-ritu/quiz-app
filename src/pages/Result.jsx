import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Result = () => {
    const [score,setScore]=useState(null);
    const [loading, setLoading]= useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchResult = async ()=>{
            try{
                const userId = localStorage.getItem("userId");
                if(!userId){
                    alert("user not found,Redirect to login");
                    navigate("/login");
                    return;
                }
                const response = await axios.get(`https://equatorial-cloud-kilogram.glitch.me/api/result/${userId}`);
                setScore(response.data.score);

            }catch(error){
                console.error("error fetching result", error);
            }finally{
                setLoading(false);
            }
        };
        fetchResult();
    },[navigate]);
    return (
    <div>
        <h1>Quiz Result</h1>
        {loading ? <p>Loading your result......</p>: <h2>Your Score: {score}</h2>}
        <button onClick={()=> navigate("/")}>Go TO Home</button>
    </div>

    );
};
export default Result;