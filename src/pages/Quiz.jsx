import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const[userAnswers, setUserAnswers] = useState({});
    const [feedback,setFeedback] = useState({});
    const navigate = useNavigate();
    useEffect(()=> {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("https://equatorial-cloud-kilogram.glitch.me/api/questions");
                if(Array.isArray(response.data)){
                    setQuestions(response.data);
                }else{
                    console.error("expected an array", response.data);
                }
            }catch(error){
                console.error("error fetching questions", error.response.data? error.response.data : error.messegae);
            }
        };
            fetchQuestions();
        },[]);
        
    const handleAnswerChange = (questionId, selectdOption) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: selectdOption
        });
        const correctAnswer = questions.find(q => q.id === questionId).correctAnswer;
        setFeedback({
            ...feedback,
            [questionId]: selectdOption === correctAnswer
        });
    };
    const handleSubmitQuiz = () => {
        localStorage.setItem("userAnswer", JSON.stringify(userAnswers));
        navigate("/result");
    };
    return (
        <div className="container">
          <h1>Quiz Page</h1>
          {questions.length === 0 ? (
            <p>Loading question...</p>
          ) : ( 
            questions.map((questions) => (
                <div key={questions.id} className="question-container">
                    <h3>
                        {questions.text}
                    </h3>
                    <div className="options">
                    {question.options.map((option, index)=>(
                        <label key={index} className={userAnswers[questions.id] === option ?(feedback[questions.id] ? "correct" : "wrong") : ""}>
                            <input
                                type="radio"
                                value={option}
                               name ={`question-${questions.id}`}
                               onChange={()=> handleAnswerChange(questions.id, option)}
                            />
                            {option}
                        </label>
                    ))}
                    </div>
                </div>
            ))
            )}
            {question.length > 0&& <button onclick={handleSubmitQuiz}>Submit Quiz</button>}
        </div>
    );
};
export default Quiz;