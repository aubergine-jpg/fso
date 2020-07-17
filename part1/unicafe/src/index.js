import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayHeader = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const pos = (good / total) * 100

  if (good === 0 && neutral === 0 && bad === 0) { 
    return ( 
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={pos + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <DisplayHeader text="give feedback" />
      </div>

      <div>
        <Button handleClick={() => setGood(good+1)} text="good" />
        <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
        <Button handleClick={() => setBad(bad+1)} text="bad" />
        <DisplayHeader text ="statistics" />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)