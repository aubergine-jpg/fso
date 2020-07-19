import React from 'react'

const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Course = ({ course }) => { 
  const totalExercises = course.parts.reduce((sum, value) => sum+value.exercises, 0)

  return (
    <div>
      <Header course={course} />
      {course.parts.map(part => 
      <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      <strong>total of {totalExercises} exercises</strong>
    </div>
  )
}

export default Course