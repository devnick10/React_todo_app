import React from 'react'

function TodoItems({
    title, 
    discription, 
    isCompleted,
    updateHandler, 
    deleteHandler,
    id,
    keys,
}) {
    return (
        <div className='todo' key={keys}>
            <div>
                <h4>{title}</h4>
                <p>{discription}</p>
            </div>
            <div>
                <input onClick={()=>updateHandler(id)} checked={isCompleted} type="checkbox" />
                <button onClick={()=>deleteHandler(id)} className='btn'>Delete</button>
            </div>
        </div>
    )
}

export default TodoItems
