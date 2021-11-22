import React, { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <tr>
       <td> {props.text} </td>
       <td> {props.value} {props.percent}  </td> 
    </tr>
  )
}

const Statistics = (props) => {
    let all = props.good + props.neutral + props.bad
    if (all === 0){
      return(
        <div>
          <p>No feedback given</p>
      </div>
      )
    }
    return(
      <div>
        <table> 
          <tbody>
            <StatisticLine text="good" value ={props.good} />
            <StatisticLine text="neutral" value ={props.neutral} />
            <StatisticLine text="bad" value ={props.bad} />
            <StatisticLine text="all" value ={all} />
            <StatisticLine text="average" value ={(props.good - props.bad)/all} />
            <StatisticLine text="positive" value ={props.good*100/all} percent = "%"/>
          </tbody>
        </table>
      </div>
    )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodToValue = () => {
    setGood(good + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() => setGood(good + 1)} text = "good" />
      <Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral" />
      <Button handleClick = {() => setBad(bad + 1)} text = "bad" />
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App
