import React from 'react'
import { useContext } from 'react'
import LoginContext from '../Contexts/LoginContext'

function Logout() {

    const userContext = useContext(LoginContext)

    const logout = ()=>{
        userContext.logout()
    }
  return (
    <div className='container'>
      {userContext.isLoggedIn ? <button style={{ cursor: 'pointer'}} onClick={logout}>Logout</button> : <button style={{opacity: 0.1, userSelect: 'none', pointerEvents: 'none', cursor: 'not-allowed'}}>Logout</button>}
    </div>
  )
}

export default Logout
