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
      <StatisticLine num={good} text="good" />
      <StatisticLine num={neutral} text="neutral" />
      <StatisticLine num={bad} text="bad" />
      <StatisticLine num={good + neutral + bad} text="all" />
      <StatisticLine num={(good*1 + bad*(-1)) / (good + neutral + bad)} text="average" />
      <StatisticLine num={(good / (good + neutral + bad)) * 100 + "%"} text="positive" />
    </div>
  )
}


const StatisticLine = ({ text, num }) => (
  <text>
      {text} {num}<br/>
  </text>
)


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App
