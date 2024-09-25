import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'
function Login() {

  const {isAuthenticated,setIsAuthenticated,setLoading} = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      
      const { data } = await axios.post(`${server}/users/login`, {
       email, password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      toast.success(data.message)
      setIsAuthenticated(true)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
      
      setIsAuthenticated(false)
      
    }
    
  }
  
  if(isAuthenticated)return <Navigate to={"/"}/>

  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
        <input value={email} required onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
        <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
          <button disabled={setLoading} type='submit'>Login</button>
          <h4>Or</h4>
          <Link to='/register'>Sing Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login
