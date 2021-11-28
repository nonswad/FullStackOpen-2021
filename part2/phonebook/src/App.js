import axios from 'axios'
import React, { useEffect, useState } from 'react'
import nameServices from './services/names'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }
  return <div className={notification.style}>{notification.message}</div>
}

const Filter = (props) => {
  return(
      <div>
      filter shown with
      <input 
        value = {props.show}
        onChange = {props.handleShowChange}
      />
      </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit = {props.addName}>
    <div>
      name: 
      <input 
        value = {props.newName} 
        onChange = {props.handleNameChange}
      />
    </div>
    <div>
      number: 
      <input 
        value = {props.newNumber}
        onChange = {props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Person = (props) => {
  if(props.name.includes(props.show))
    return(
      <div>
        <p>
          {props.name} {' '} 
          {props.number} 
          <button onClick = {() => props.deletePerson(props.id)}>delete</button>
          </p>
      </div>
    )
  else
    return(
      <p> </p>
    )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ show, setShow] = useState('')
  const [ notification, setMessage] = useState({
    message: null,
    style: null
  })

  useEffect(() => {
    nameServices
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
    .catch(error => {
      console.log(error)
    })  
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const arrayNames = persons.map(person => person.name)
    if (arrayNames.includes(newName)){
      window.confirm(`${newName} is already added to phonebook, replace the old number?`)
      const persona = persons.find(p => p.name === newName)
      const changedPerson = {...persona, number: newNumber}
      console.log(changedPerson)
      nameServices
      .update(persona.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== persona.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({
          message: `Updated ${newName}`,
          style: 'success'
        })
        setTimeout(() => {
          setMessage({message: null, style: null})
        }, 5000)
      })
      .catch(error => {
        setMessage({
          message: `Information of ${newName} already deleted from the server`,
          style: 'error'
        })
        setTimeout(() => {
          setMessage({message: null, style: null})
        }, 5000)
        setPersons(persons.filter(p => p.id !== persona.id))
      })  
    }
    else {
      const nameObject = {name: newName, number: newNumber}
      nameServices
      .create(nameObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject))
        setNewName('')
        setNewNumber('')
        setMessage({
          message: `Added ${newName}`,
          style: 'success'
        })
        setTimeout(() => {
          setMessage({message: null, style: null})
        }, 5000)
      })
      .catch(error => {

        console.log(error)
      })  
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowChange = (event) => {
    setShow(event.target.value)
  }

  const deletePerson = (id) => {
    const persona = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${persona.name}?`))
    {
        axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          return setPersons (persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessage({
            message: `Information about ${persona.name} already deleted from the server`,
            style: 'error'
          })
          setTimeout(() => {
            setMessage({message: null, style: null})
          }, 5000)
          setPersons(persons.filter(p => p.id !== persona.id))
        })  
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification = {notification} />

      <Filter show = {show} handleShowChange = {handleShowChange} />

      <h3>Add a new</h3>

      <PersonForm 
        addName = {addName} 
        newName = {newName} 
        handleNameChange = {handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
      />

      <h3>Numbers</h3>
    
        {persons.map(person =>
          <Person 
            key = {person.name} 
            name = {person.name} 
            number = {person.number} 
            show = {show}
            id = {person.id}
            deletePerson = {deletePerson}
            />
        )} 
    </div>
  )


/* Exercise 2.9

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with
        <input 
          value = {show}
          onChange = {handleShowChange}
        />
      </div>
        
      <h2>Add a new</h2>

      <form onSubmit = {addName}>
        <div>
          name: 
          <input 
            value = {newName} 
            onChange = {handleNameChange}
          />
        </div>
        <div>
          number: 
          <input 
            value = {newNumber}
            onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
    
        {persons.map(person =>
          <Person key = {person.name} name = {person.name} number = {person.number} show = {show}/>
        )} 


    </div>
  )
*/
}

export default App
