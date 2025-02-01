import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const[userAnswer, setUserAnswer] = useState({});
    const [feedback,setFeedback] = useState({});
    const navigate = useNavigate();
    useEffect(()=> {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("https://gaudy-feather-meadowlark.glitch.me/api/question");
                setQuestions(response.data);
            }catch (error){
                console.error("error fetchin questions", error);
            }
        };
        fetchQuestions();
    },[]);
    const handleAnswerChange = (questionId, selectdOption) => {
        setUserAnswer({
            ...userAnswer,
            [questionId]: selectdOption
        });
        const correctAnswer = questions.find(q => q.id === questionId).correctAnswer;
        setFeedback({
            ...feedback,
            [questionId]: selectdOption === correctAnswer
        });
    };
    const handleSubmitQuiz = () => {
        localStorage.setItem("userAnswer", JSON.stringify(userAnswer));
        navigate("/result");
    };
    return (
        <div>
          <h1>Quiz Page</h1>
          {questions.length === 0 ? (
            <p>Loading question...</p>
          ) : ( 
            questions.map((question) => (
                <div key={question.id}>
                    <h3>
                        {question.text}
                    </h3>
                    {question.option.map((option, index)=>(
                        <div key = {index}>
                            <input type="radio"
                            name={`question${question.id}`}
                            value={option}
                            onChange={()=> handleAnswerSelect(question.id, option)}
                            checked={userAnswer[question.id] === option}    
                            />
                            <label>{option}</label>
                        </div>
                    ))}
                    {userAnswer[question.id] && (
                        <p style={{color: feedback[question.id] ? "green" : "red"}}>
                            {feedback[question.id] ? "Correct" : "Incorrect"}
                        </p>
                    )}
                </div>
            ))
            )}
            {questions.length>0 && (
                <button onClick={handleSubmitQuiz}>Submit Quiz</button>
            )}
            
        </div>
    );
};
export default Quiz;


                    

