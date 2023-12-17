import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { MyContext } from './MyContext'

function Card() {

    const {tasks, addTasks, editable, setEditable, editid, setEditid }= useContext(MyContext);

    const [filterTasks, setFilterTasks] = useState(tasks);

    useEffect(()=>{
    changeHandle('all');
    console.log('updated task : ',tasks)
    },[tasks])

    function changeHandle(value){
        switch (value) {
            case 'completed':
                setFilterTasks(tasks.filter((task)=>task.status == true));
                break;
            case 'NotCompleted':
                setFilterTasks(tasks.filter((task)=>task.status == false))
                break;
            default:
                setFilterTasks(tasks)                
        }
    }

    // const [status, setStatus] = useState('Not-Completed')

    const handleStatus = (e, id, task) => {
        addTasks((prevTasks)=>prevTasks.map((task) =>
          task.id === id ? { ...task, status : e.target.value === 'completed' } : task
        ))
      }

    const handleDelete = (id)=>{
        const updatedTask = tasks.filter((task)=>task.id !== id);
        addTasks(updatedTask)
    }

    const handleEdit = (id)=>{
        setEditable((prev)=>!prev)
        setEditid(id)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col p-5 d-flex justify-content-between flex-wrap">
                <h3>My Todos</h3>
                <div>
                    <h5>
                    <label htmlFor="filter" className='mx-2'>Filter : </label>
                    <select name="all" id="all" onChange={(e)=>changeHandle(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="NotCompleted">Not Completed</option>
                    </select></h5>
                </div>
            </div>
        </div>
        <div className="container mt-3 d-flex p-3 justify-content-center" style={{columnGap:"20px", flexWrap:"wrap"}}>
            {filterTasks.map((task)=>(
                <div className="card mt-3 p-3 " key={task.id} style={{overflow:'auto', backgroundColor:(task.status ? '#CADBE3':'#A1EDAD'), textDecoration:(task.status ? 'line-through' : null)}}>
                    <div className="card-body text-start">
                        <h5>Title : {task.name}</h5>
                        <h6>Description : {task.description}</h6>
                        <label htmlFor="status">Status : </label>
                        {editable?null:
                        <select className='mx-2' name="select" id="select" onChange={(e)=>handleStatus(e, task.id, task)} value={task.status ? 'completed' : 'not-completed'} style={{backgroundColor:(task.status?'green':'pink')}}>
                            <option value="not-completed">Not Completed</option>
                            <option value="completed">Completed</option>
                        </select>}
                    </div>
                    <div className="but d-flex justify-content-center">
                        {editable?null:<button className="btn btn-success m-2" onClick={()=>handleEdit(task.id)}>Edit</button> }
                        {editable?null:<button className='btn btn-danger m-2' onClick={()=>handleDelete(task.id)}>Delete</button>}
                        {/* <button className="btn btn-success m-2" onClick={()=>handleEdit(task.id)}>Edit</button>  */}
                        {/* <button className="btn btn-success m-2" onClick={()=>handleEdit(task.id)}>Edit</button> */}
                        {/* <button className='btn btn-danger m-2' onClick={()=>handleDelete(task.id)}>Delete</button> */}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Card