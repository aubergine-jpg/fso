import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
	return (
		<div>
			<h1>
				{props.course}
			</h1>
		</div>
	)
}

const Part = (props) => {
	return (
		<div>
			<p>
				{props.part} {props.exercises}
			</p>
		</div>
	)
}

const Content = (props) => {
	return (
		<div>
			<Part part={props.p1} exercises={props.exe1} />
			<Part part={props.p2} exercises={props.exe2} />
			<Part part={props.p3} exercises={props.exe3} />
		</div>
	)
}

const Total = (props) => {
	return (
		<div>
			<p>
				Number of exercises {props.exercises}
			</p>
		</div>
	)
}

const App = (props) => {
	const course = 'Half Stack application development'
	const part1 = 'Fundamentals of React'
	const ex1 = 10
	const part2 = 'Using props to pass data'
	const ex2 = 7
	const part3 = 'State of a component'
	const ex3 = 14

  return (
    <div>
      <Header course={course} />
			<Content p1={part1} exe1={ex1} p2={part2} exe2={ex2} p3={part3} exe3={ex3}/>
			<Total exercises={ex1 + ex2 + ex3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))