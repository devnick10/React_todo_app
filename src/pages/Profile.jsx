import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../Components/Loader'



function Profile() {
   
          
  const {user,loading} = useContext(Context)


   

  return (
    loading?<Loader/>:(

      <div className='profile'>
        <h1>Welcome {user?.name}</h1>
        <h2>Username: {user?.name}</h2>
        <p>Email: {user?.email}</p>
      </div>
    )
  
  )
}

export default Profile
