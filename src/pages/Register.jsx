import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { Context } from '../main'

function Register() {



  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {isAuthenticated,setIsAuthenticated,setLoading,loading} = useContext(Context)

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      const { data } = await axios.post(`${server}/users/new`, {
        name, email, password
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
    <>
      <div className='login'>
        <section>
          <form onSubmit={submitHandler}>
            <input value={name} required onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' />
            <input value={email} required onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
            <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
            <button disabled={loading} type='submit'>Sing Up</button>
            <h4>Or</h4>
            <Link to='/login'>Login</Link>
          </form>
        </section>
      </div>
    </>
  )
}

export default Register
