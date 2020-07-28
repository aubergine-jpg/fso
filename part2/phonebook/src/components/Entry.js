import React from 'react'

const Entry = ({ entry, delEntry }) => {
  return (
    <li>{entry.name} {entry.number} <button onClick={delEntry}>delete</button></li>
  )
}

export default Entry