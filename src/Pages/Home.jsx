import React from 'react'
import { useContext } from 'react'
import LoginContext from '../Contexts/LoginContext'

function Home() {
  const userContext = useContext(LoginContext)

  const toggleDark = () =>{
    userContext.toggleDarkTheme()
  }

  return (
    <div className='container'>
        {userContext.isLoggedIn ? <div className="userData">
        <h1 style={{marginBottom: '20px'}}>UserInfo</h1>

          <h2>LoggedIn : <span className="green">True</span></h2>
          <h2>Name : <span className="blue">{userContext.displayName}</span></h2>
          <h2>Email : <span className="blue">{userContext.userEmail}</span></h2>
          <h2>Phone Number : <span className="blue">{userContext.userPhone}</span></h2>
          <h2>Dark Mode : <button className='green' onClick={toggleDark} style={{color: '#fff', padding: '15px'}}>{userContext.darkTheme}</button> </h2>
        </div> : <h1>You are <span className='red'>Logged Out</span></h1> }
        
        {/* <h2>LoggedIn : <span className="red"></span></h2> */}

    </div>
  )
}

export default Home
