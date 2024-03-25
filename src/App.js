// App.js
import React  from 'react';
import Quiz from './components/Quiz/Quiz';
import Home from './components/Page/Home'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Nopage from './components/Page/Nopage'; 


function App() {


  return (
    <div>
      {/* Render the Quiz component with the fetched quiz data */}
      <BrowserRouter>
      <Routes>
        <Route index element= {<Nopage/>}/>
        <Route path="/eq-home/:id" element={<Home />} />
        <Route path = "/eq-home/:id/mcq" element ={<Quiz/>}/> 
        <Route path ="*" element={<Nopage/>}/>
      </Routes>
      </BrowserRouter>
      {/* <Quiz /> */}
    </div>
  );
}

export default App;
