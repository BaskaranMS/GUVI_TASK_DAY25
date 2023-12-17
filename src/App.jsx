import React, { useEffect, useState } from 'react'
import Home from './Home'
import Card from './Card';
import { MyContext } from './MyContext';

function App() {
  const [tasks, addTasks] = useState(()=>{
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks? JSON.parse(storedTasks) : []
  })
  const [editable, setEditable] = useState(false)
  const [editid, setEditid] = useState(0)

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks])

  return (
    <div>
      <MyContext.Provider value={{ tasks, addTasks, editable, setEditable, editid, setEditid }}>
        <Home></Home>
        <Card></Card>
      </MyContext.Provider>
    </div>
  )
}

export default App
