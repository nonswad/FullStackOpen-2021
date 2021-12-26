import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  const hideWhenVisible = {display: isVisible ? 'none' : ''}
  const showWhenVisible = {display: isVisible ? '' : 'none'}

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
} 

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

/*const exportedObject = {Toggleable,}
export default exportedObject*/
export default Toggleable

