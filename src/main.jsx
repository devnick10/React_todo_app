import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/app.scss"
export const server = 'https://nodejs-todoapp-zyfi.onrender.com/api/v1'

export const Context = createContext({
  isAuthenticated:false
})

const AppWrapper = ()=>{
  
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState({});


  return(
    <Context.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      loading,setLoading,
      user,setUser

      }}>
    <App/>
    </Context.Provider>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AppWrapper/>
  </StrictMode>,
)
