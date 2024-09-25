import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {Context, server} from "../main"
import toast from 'react-hot-toast'
import TodoItems from '../Components/TodoItems'
import { Navigate } from 'react-router-dom'
function Home() {
    
  const [title,setTitle] = useState('')
  const [discription,setDiscription] = useState('')
  const [loding,setLoading] = useState(false)

  const [tasks,setTasks] = useState([])
  const [refresh,setrefresh] = useState(false)
  const {isAuthenticated} = useContext(Context)




 const updateHandler = async(id)=>{
   try {
     
   const {data} =  await axios.put(`${server}/tasks/${id}`,{},{withCredentials:true})
   
   toast.success(data.message)
   setrefresh(prev=>!prev)


   } catch (error) {
    toast.error(error.response.data.message)
   }
 }
 const deleteHandler = async(id)=>{
  try {
     
    const {data} =  await axios.delete(`${server}/tasks/${id}`,{withCredentials:true})
    
    toast.success(data.message)
    setrefresh(prev=>!prev)

 
    } catch (error) {
     toast.error(error.response.data.message)
    }
 }


    
  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
        setLoading(true)

      const {data} = await axios.post(`${server}/tasks/create`,{
        title,discription,
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        }
      }
    )
    
    toast.success(data.message)
    setLoading(false)
    setTitle('')
    setDiscription('')
    setrefresh(prev=>!prev)
    
  } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

   
  useEffect(()=>{
  
    axios.get(`${server}/tasks/alltask`,{
      withCredentials:true
    }).then(res =>{
      setTasks(res.data.tasks)
    }).catch(e=>{
      toast.error(e.response.data.message)
    })


  },[refresh])

  if(!isAuthenticated)return <Navigate to={"/login"}/>



  return (
    <div className='container'>
           
           <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
        <input value={title} required onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' />
        <input value={discription} required onChange={(e) => setDiscription(e.target.value)} type="text" placeholder='Discription' />
        
          <button disabled={loding} type='submit'>Add Task</button>
        </form>
      </section>
    </div>



        <section className='todosContainer'>
          
          {
            tasks.map((task)=>(
             <TodoItems
              title={task.title} 
              discription={task.discription} 
              isCompleted={task.iscompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={task._id}
              keys={task._id}
               />
            ))
          }

        </section>
    </div>
  )
}

export default Home
