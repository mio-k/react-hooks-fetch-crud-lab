import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(questions =>{
      setList(questions)
    })
  }, [])

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    }).then(response => response.json())
      .then (data => {
        const updatedQuestions = list.filter(question => question.id !== id)
        setList(updatedQuestions)
      })
    }

  function handleAnswerChange(question, newAnswer){
    console.log(question.correctIndex)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      body:JSON.stringify({
        correctIndex: newAnswer
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then (data => console.log(data))
  }

  const questionItems = list.map(question => (
    <QuestionItem key={question.id} question = {question} handleDeleteClick={handleDeleteClick} handleAnswerChange= {handleAnswerChange} />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
