import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phones from './services/phones.js'


function App() {
  const [persons, setPersons] = useState([])
  useEffect(()=>{
      phones.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const existingPerson =persons.filter(person => person.name === newName) 
    console.log(existingPerson)
    if (existingPerson.length > 0) {
      if (window.confirm(`{newName} is already added to phonebook, replace the old number with a new number?`)) {
        const newPerson = {
          ... existingPerson[0],
          number: newNumber
        }
        phones.update(existingPerson[0].id, newPerson).then(newPerson => {
          console.log(newPerson)
          const updatePersons = persons.map(person => person.id !== newPerson.id ? person : newPerson)
          setPersons(updatePersons)
        })
      }
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      phones.create(newPerson).then(newPerson =>
      setPersons(persons.concat(newPerson)))
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePhone = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phones.deleteNum(id).then(() => {
        const newPersons = persons.filter(person => person.id != id)
        console.log(newPersons)
        setPersons(newPersons)
      })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm 
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePhone={deletePhone}/>
    </div>
  )
}

export default App
