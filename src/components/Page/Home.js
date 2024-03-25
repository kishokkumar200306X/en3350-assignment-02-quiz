// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Button from 'react-bootstrap/Button';


// function Home() {
//     const navigate = useNavigate();

//     return (
//         <>
//             <div>home</div>
//             <button onClick={() => navigate('mcq')}>start mcq</button>
//         </>
//     );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [quote, setQuote] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetch("https://api.quotable.io/random?tags=nature")
            .then(response => response.json())
            .then(data => {
                setQuote(data.content);
            })
            .catch(error => console.error("Error fetching quote:", error));
    }, []);

    return (
        <div className="home-container">
            <div className="quote-container">
                <div className="inverted-comma left-inverted-comma">"</div>
                <div className="quote">{quote}</div>
                <div className="inverted-comma right-inverted-comma">"</div>
                <h1>Welcome {id}</h1>
            </div>
            <button className="big-button" onClick={() => navigate('mcq')}>Start MCQ</button>
        </div>
    );
};

export default Home;



