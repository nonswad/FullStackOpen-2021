import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const exr = course.parts.map(part => part.exercises)
    const sum = exr.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    })
    return(
      <h2>total of exercises {sum}</h2>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map (part => 
            <Part key = {part.id} part = {part} />
        )}
      </div>
    )
  }

const Course = ({ course }) => {
    return(
        <div>
            <Header course = {course}/>
            <Content course = {course}/>
            <Total course = {course} />
        </div>
    )
}

export default Course