import React, { useState } from 'react'

const Display = ({ counter }) =>{
  return (
    <div>{counter}</div>
  )
}
/*
const Button = (props) => { 
  console.log(props)
  const { handleClick, text } = props
  
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
*/
const History = (props) =>{
  if (props.allClicks.length === 0){
    return(
      <div>
        the app is used by pressing the button
      </div>
    )
  }
  return(
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    setValue(newValue)
  }

  // Do not define components inside another component
  const Display = props => <div>{props.value}</div>

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
/*
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick = {handleLeftClick} text = "left" />
      <Button handleClick = {handleRightClick} text = "right" />
      {right}
      <History allClicks = {allClicks } />
    </div>
  )
}
*/
export default App