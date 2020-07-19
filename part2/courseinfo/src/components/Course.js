import React from 'react'

const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Header = ({ courses }) => {
  return (
    <h2>{courses.name}</h2>
  )
}

const Course = ({ courses }) => { 
  const totalExercises = courses.parts.reduce((sum, value) => sum+value.exercises, 0)

  return (
    <div>
      <Header courses={courses} />
      {courses.parts.map(part => 
      <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      <strong>total of {totalExercises} exercises</strong>
    </div>
  )
}

export default Course