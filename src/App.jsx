import { useEffect, useState } from "react"
import Header from "./components/Header"
import Tabs from "./components/Tabs"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  
  const [todos, setTodos]= useState([
    { input: 'Hello! Add your first todo!', complete: true }
  ])
  const [selectedTab, setSelectedTab]=useState("All")

  function handleAddTodo(newTodo){
    const newTodos=[...todos,{ input: newTodo, complete: false }]
    setTodos(newTodos)
    handleSaveData(newTodos)
  }
  function handleDeleteTodo(index){
    const newTodos=todos.filter((val, valIndex)=>{
      return(
      valIndex!==index
      )
    })
    setTodos(newTodos)
    handleSaveData(newTodos)
  }
  function handleCompleteTodo(index){
    let newTodos=[...todos]
    let completedTodo=todos[index]
    completedTodo['complete']=true
    newTodos[index]=completedTodo
    setTodos(newTodos)
    handleSaveData(newTodos)
  } 
  function handleSaveData(currTodos){
    localStorage.setItem("todo-app",JSON.stringify({todos:currTodos}))
  }
  useEffect(()=>{
    if(!localStorage||!localStorage.getItem("todo-app")){return}
    let db = JSON.parse(localStorage.getItem("todo-app"))
    setTodos(db.todos)
  },[])



  return (
    <>
      <Header todos={todos}/>
      <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList todos={todos} selectedTab={selectedTab} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo}/>
      <TodoInput handleAddTodo={handleAddTodo} />
     
    </>
  )
}

export default App
