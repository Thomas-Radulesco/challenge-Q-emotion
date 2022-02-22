import React from 'react';
import QuestionList from './features/questionList/QuestionList';
import QuestionForm from './features/questionForm/QuestionForm';
import './App.scss';


function App() {
  
  return (
    <div className="App">
        <QuestionList />
        <QuestionForm />    
    </div>
  );
}

export default App;
