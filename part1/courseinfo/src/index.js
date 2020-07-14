import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
	console.log(props)

	return (
		<div>
			<h1>
				{props.course['name']}
			</h1>
		</div>
	)
}

const Part = (part) => {
	console.log(part)

	return (
		<div>
			{part.part} {part.exercises}
		</div>
	)
}

const Content = (props) => {
	console.log(props)

	return (
		<div>
			<Part part={props.props.parts[0].name} exercises={props.props.parts[0].exercises} />
			<Part part={props.props.parts[1].name} exercises={props.props.parts[1].exercises} />
			<Part part={props.props.parts[2].name} exercises={props.props.parts[2].exercises} />
		</div>
	)
}

const Total = (props) => {
	console.log(props)

	return (
		<div>
			<p>
				Number of exercises {props.props.parts[0].exercises + props.props.parts[1].exercises + props.props.parts[2].exercises}
			</p>
		</div>
	)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
			<Content props={course} />
			<Total props={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))