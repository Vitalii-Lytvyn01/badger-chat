import React from 'react'
import './Search.scss'

export function Search() {
  return (
    <div className='search'>
      <div className="search-form">
        <input
          placeholder='Find a user'
          type="text"
        />
      </div>
    </div>
  )
}