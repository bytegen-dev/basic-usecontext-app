import { Link, Route, Routes} from "react-router-dom";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import LoginContext from "./Contexts/LoginContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Oopa from "./Pages/Oopa";

function App() {
    const resetState = {
      isLoggedIn: false,
      displayName: 'Guest',
      userEmail: null,
      userPhone: null,
      darkTheme: 'off'
  }

  const [userInfo, setUserInfo] = useState({
      ...resetState,
      login: (name, email, phone, dark)=>{
        console.log('logging in.....')
          setUserInfo((prev)=>{
              return ({
                  ...prev,
                  isLoggedIn: true,
                  displayName: name,
                  userEmail: email,
                  userPhone: phone,
                  darkTheme: dark
              })
          })

          window.localStorage.setItem('user', 'true')
          window.localStorage.setItem('userName', name)
          window.localStorage.setItem('userEmail', email)
          window.localStorage.setItem('userPhone', phone)
          window.localStorage.setItem('userDark', dark)
        },
        logout: ()=>{
          setUserInfo((prev)=>{
            return ({
              ...prev,
              ...resetState
            })
        })
        document.title = 'Logged Out -> Isaac Adebayo Project'
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('userEmail')
        window.localStorage.removeItem('userPhone')
        window.localStorage.removeItem('userDark')
      },
      toggleDarkTheme: ()=>{
        setUserInfo((prev)=>{
          if (prev.darkTheme === 'on'){
            window.localStorage.setItem('userDark', 'off')
            return ({
              ...prev,
              darkTheme: 'off'
            })
            
          } else {
            window.localStorage.setItem('userDark', 'on')
            return ({
              ...prev,
              darkTheme: 'on'
            })
          }
          
        })
      }
    })

  useLayoutEffect(()=>{
    let userPrevious
    let userPreviousName
    let userPreviousEmail
    let userPreviousPhone
    let userPreviousDark

    userPrevious = window.localStorage.getItem('user')
    userPreviousName = window.localStorage.getItem('userName')
    userPreviousEmail = window.localStorage.getItem('userEmail')
    userPreviousPhone = window.localStorage.getItem('userPhone')
    userPreviousDark = window.localStorage.getItem('userDark')
    if (userPrevious === 'true'){
      document.title = 'Logged In -> Isaac Adebayo Project'
      setUserInfo((prev)=>{
        return ({
          ...prev,
          isLoggedIn: true,
          displayName: userPreviousName,
          userEmail: userPreviousEmail,
          userPhone: userPreviousPhone,
          darkTheme: userPreviousDark,
        })
      })
    }

    else{
      document.title = 'Logged Out -> Isaac Adebayo Project'
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('userName')
      window.localStorage.removeItem('userEmail')
      window.localStorage.removeItem('userPhone')
      window.localStorage.removeItem('userDark')
    }
  }, [])

  useEffect(()=>{
    const links = document.querySelectorAll('a')
    links.forEach((link)=>{
      link.addEventListener("touchstart", ()=>{
        link.classList.add("touching")
      })
      link.addEventListener("touchend", ()=>{
        link.classList.remove("touching")
      })
    })
    window.addEventListener("contextmenu", (e)=>{
      e.preventDefault()
      console.error('Dev has disabled this Event')
    })
  }, [])

  return (
    <LoginContext.Provider value={userInfo}>
      <div className={userInfo.darkTheme}>
        <div className="preloader">
          <div className="preloader-circle">
          </div>
        </div>
        <nav>
          <ul  style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2vw",
          }}>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/logout'}>Logout</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/404" element={<Oopa />} />
          <Route path="*" element={<Oopa />} />
        </Routes>
        <div onClick={()=>{
          window.location.reload()
        }} className="reload">
          🔄
        </div>
      </div>
    </LoginContext.Provider>
  );
}

export default App;

export const UserContext = createContext()