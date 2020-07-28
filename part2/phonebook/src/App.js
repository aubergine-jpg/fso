import React, { useState, useEffect } from 'react'
import Entry from './components/Entry'
import Filter from './components/Filter'
import EntryForm from './components/EntryForm'
import entryService from './services/entries'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [successNot, setSuccessNot] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('Fetching data')
      entryService      
      .getAll()      
      .then(initialEntries => {        
        setPersons(initialEntries)      
      })  
    }, [])

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

  const SuccessNot = ({ message }) => {
    const successStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 24
    }

    if (message === null) {
      return null
    }

    return (
      <div className="success" style={successStyle}>{message}</div>
    )
  }

  const Error = ({ message }) => {
    const errorStyle = {
      color: 'red',
      fontStyle: 'italic',
      fontSize: 24
    }

    if (message === null) {
      return null
    }

    return(
      <div className="error" style={errorStyle}>{message}</div>
    )
  }

  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNum
    }

    if ((persons.filter(persons => persons.name === entryObject.name)).length > 0) {
      const entryToChange = persons.find(p => p.name === entryObject.name)
      const entryID = entryToChange.id
      const changedEntry = {...entryToChange, number: newNum}

      if (window.confirm(`${entryObject.name} is already in the phonebook. Do you want to replace the old number with a new one?`)) {
          entryService
            .update(entryID, changedEntry)
            .then(returnedEntry => {
              setPersons(persons.map(entry => entry.id !== entryID ? entry : returnedEntry))
              setSuccessNot(`${entryObject.name}'s number has been changed.`)
              setTimeout(() => {
                setSuccessNot(null)
              }, 2000)
            })
          setNewName('')
          setNewNum('')
          console.log('entry updated')
          return
        }
      else {
        return
      }
    }

    entryService
      .create(entryObject)
        .then(newEntry => {
          setPersons(persons.concat(newEntry))
          setNewName('')
          setNewNum('')
          setSuccessNot(`${entryObject.name} was added to the phonebook.`)
          setTimeout(() => {
            setSuccessNot(null)
          }, 2000)
          })
      }

  const delEntry = id => {
    const toBeDeleted = persons.filter(person => person.id === id)[0]
    const delName = toBeDeleted.name

    if (window.confirm("Are you sure you want to delete this entry?")) {
      entryService
        .del(id)
        .then(()=> {
          console.log('deleted entry')
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`${delName}'s entry has already been deleted from the phonebook.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
    else {
      return
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNot message={successNot} />
      <Error message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <EntryForm 
        addEntry={addEntry} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNum={newNum} 
        handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      {entriesToShow.map(entry => <Entry key={entry.name} entry={entry} delEntry={()=> delEntry(entry.id)}/> )}
    </div>
  )
}

export default App