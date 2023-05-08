import React from 'react'
import { Link } from 'react-router-dom'

function Oopa() {
  return (
    <div className='oops container'>
      <h1 className='red'>OOPS!!</h1>
      <p>Page was not found</p>
      <Link to={"/"}>Return to Home</Link>
    </div>
  )
}

export default Oopa
