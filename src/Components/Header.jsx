import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'

function Header() {
  
  const {isAuthenticated,setIsAuthenticated,setLoading,loading,setUser} = useContext(Context)
 
  const logoutHandler = async () => {
    
    setLoading(true)

    try {
      
      const { data } = await axios.get(`${server}/users/logout`,
       {
        withCredentials: true
      })
      toast.success(data.message)
      setIsAuthenticated(false)
      setUser({})
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(true)
      setLoading(false)
      
    }
    
  }
  



  return (
    <>

      <nav className='header'>
    
      <div>
        <img src="./src/assets/note.png" alt="logo"/>
        <h2>Todo App.</h2>
        
      </div>
      <article>
       {isAuthenticated?<Link to={"/"}>Home</Link>:''}  
       {isAuthenticated?<Link to={"/profile"}>Profile</Link>:""} 

        {
          isAuthenticated? <button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>:<Link to={"/login"}>Login</Link>
        }
        
        

        
        
      </article>
      </nav>
    </>
  )
}

export default Header
