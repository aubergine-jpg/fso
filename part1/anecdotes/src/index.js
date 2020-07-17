import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Rand = () => Math.round(Math.random()*(anecdotes.length-1))

const App = (props) => {
  const [selected, setSelected] = useState(Rand())
  const [score, setScore] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {score[selected]} votes
      </div>

      <div>
        <Button handleClick={() => {
          const scoreCopy = [...score]
          scoreCopy[selected] += 1
          setScore(scoreCopy)
        }} text="vote" />
        <Button handleClick={() => setSelected(Rand())} text="next anecdote" />
      </div>

      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[score.indexOf(Math.max(...score))]}</div>
      <div>has {score[score.indexOf(Math.max(...score))]}</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)