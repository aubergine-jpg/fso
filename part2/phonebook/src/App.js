import React, { useState } from 'react'
import Entry from './components/Entry'
import Filter from './components/Filter'
import EntryForm from './components/EntryForm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'123-123-123' },
    { name: 'Ada Lovelace', number: '34-44-1235' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const entriesToShow = showAll
  ? persons
  : persons.filter(persons => (persons.name.toLowerCase().search(newFilter.toLowerCase()) === 0))

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setShowAll(false)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNum
    }

    if ((persons.filter((persons) => persons.name === entryObject.name)).length > 0) {
      alert(`Zoinks! ${newName} is already in the phonebook!`)
      setNewName('')
      setNewNum('')
      return
    }

    setPersons(persons.concat(entryObject))
    setNewName('')
    setNewNum('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <EntryForm 
        addEntry={addEntry} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNum={newNum} 
        handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      {entriesToShow.map(entry => <Entry key={entry.name} entry={entry} /> )}
    </div>
  )
}

export default App