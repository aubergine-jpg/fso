import React from 'react'

const Entry = ({ entry }) => {
  return (
    <li>{entry.name} {entry.number}</li>
  )
}

export default Entry