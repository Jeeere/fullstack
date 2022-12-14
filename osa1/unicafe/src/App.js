import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine num={good} text="good" />
          <StatisticLine num={neutral} text="neutral" />
          <StatisticLine num={bad} text="bad" />
          <StatisticLine num={good + neutral + bad} text="all" />
          <StatisticLine num={((good*1 + bad*(-1)) / (good + neutral + bad)).toFixed(1)} text="average" />
          <StatisticLine num={((good / (good + neutral + bad)) * 100).toFixed(1) + "%"} text="positive" />
        </tbody>
      </table>
    )
  }
}


const StatisticLine = ({ text, num }) => (
  <tr>
    <td>{text}</td>
    <td>{num}</td>
  </tr>
)


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App
