import React from 'react';

const EntryForm = ({ addEntry, newName, handleNameChange, newNum, handleNumChange }) =>  {
    return (
    <form onSubmit={addEntry}>
    <div>
      name: <input 
        value={newName}
        onChange={handleNameChange} />
    </div>
    <div>
      number: <input 
        value={newNum}
        onChange={handleNumChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    )
}

export default EntryForm