import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input 
                        value={filter}
                        onChange={handleFilterChange}/>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
            />
          <br/>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
        <h2>Numbers</h2>
        <ul>
          {persons.filter((person) => {
            console.log(person)
            console.log(person.name.indexOf(filter))
             return filter === '' || person.name.toLowerCase().indexOf(filter) > -1 ? true : false
          }).map((person) => {
            return <li key={person.id}>{person.name} {person.number}</li>
          })}
        </ul>
      </form>
    </div>
  )
}

export default App
