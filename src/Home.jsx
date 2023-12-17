import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { MyContext } from './MyContext'

function Home() {

    const {tasks, addTasks, editable, setEditable, editid, setEditid } = useContext(MyContext)
    
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')

    const handleAddTodo = ()=>{
        if(title.trim().length > 0 && body.trim().length > 0){
        const ids = tasks.length < 1 ? 1 : tasks[tasks.length-1].id + 1;
        const todoTask = {
            id : ids,
            name : title,
            description : body,
            status : false
        }
        addTasks([...tasks, todoTask])
        setTitle('')
        setBody('')
    }else{
        alert('ENTER SOME TASK TITLE OR DESCRIPTION!!!!!')
        setTitle('');
        setBody('')
    }
}

const updateTodo = () => {
    const taskToUpdate = tasks.find((ta) => ta.id === editid);
  
    if (taskToUpdate) {
      const updatedTasks = tasks.map((ta) =>
        ta.id === taskToUpdate.id ? { ...ta, name: title, description: body } : ta
      );
      addTasks(updatedTasks);
    }
    setTitle('')
    setBody('')
    setEditable((prev)=>!prev)
    setEditid(0)
  };

    useEffect(() => {
        if (editable) {
          if (editid > 0) {
            const taskToEdit = tasks.find((task) => task.id === editid);
            if (taskToEdit) {
              setTitle(taskToEdit.name);
              setBody(taskToEdit.description);
            }
          } else {
            setTitle('');
            setBody('');
          }
        }
      }, [editable, editid, tasks]);
      
  return (
    <div className="container text-center">
        <div className="header">
            <h1 className='text-success'>My Todo</h1>
            <div className="form-group d-flex justify-content-center align-items-center flex-wrap row-gap-2">
                {editable?<label className='mt-2'><h3>Title : </h3></label>:null}
                <input className="mx-2 mt-2 p-1 rounded" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Todo Name' style={{width:"300px"}}/>
                {editable?<label className='mx-2 mt-2'><h3>Description : </h3></label>:null}
                <input className="mx-2 mt-2 p-1 rounded" type="text" value={body} onChange={(e)=>setBody(e.target.value)} placeholder='Todo Description'style={{width:"300px"}}/>
                {editable?<button className="btn btn-primary p-2 mx-2" onClick={updateTodo} style={{width:"150px"}}>Update Todo</button> : <button className="btn btn-success p-2 mx-2" onClick={handleAddTodo} style={{width:"150px"}}>Add Todo</button>}
            </div>
        </div>
    </div>
  )
}

export default Home