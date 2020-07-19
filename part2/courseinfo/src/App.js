import React from 'react'
import Course from './components/Course'

const App = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(courses => <Course key={courses.id} courses={courses} />)}
    </div>
  )
}

export default App