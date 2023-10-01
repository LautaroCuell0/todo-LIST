import { useState } from 'react'
import './todolist.css'



const TodoList=()=>{

    

    const [todoArray, setTodoArray] = useState([

        {
           titulo: 'titulo1',
           descripcion: 'descripcion1',
           isComplete: false,
           id:1
        },
        {
           titulo: 'titulo2',
           descripcion: 'descripcion2',
           isComplete: true,
           id:2
        }
       
       ])

    const completeCount= todoArray.filter( todo=> todo.isComplete === true).length
    const pendingCount= todoArray.length - completeCount
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: ''
    })
    const [todoEditId, setTodoEditId] = useState(null)

    const handleChange = ({target})=>{
        setFormData({...formData, [target.name]: target.value})
    }

    const addTodo =(e)=>{
    e.preventDefault()
      if(todoEditId !== null){
          const newTodo = [...todoArray]
          let todo = newTodo.find((todo)=> todo.id === todoEditId)
          todo.titulo = formData.titulo
          todo.descripcion = formData.descripcion   
          setTodoArray(newTodo)
          setTodoEditId(null)
          setFormData({titulo: '',descripcion: ''})
      } else {
        if(formData.titulo !== '' && formData.descripcion !== ''){
            const todo = formData
            todo.isComplete == false
            todo.id = Date.now()
    
          setTodoArray([...todoArray, todo])
          setFormData({titulo: '',descripcion: ''})
        }
      }
    }

    const deleteTodo = (id)=>{
       const newTodos = todoArray.filter(todo=> todo.id !== id)
       setTodoArray(newTodos)
    }

    const toggleTodo=(id)=>{
        const newTodo = [...todoArray]
        let todo = newTodo.find((todo)=> todo.id === id)
        todo.isComplete = !todo.isComplete
        setTodoArray(newTodo)

    }

    const deleteComplete=()=>{
         const newTodo = todoArray.filter(todo => todo.isComplete === false)
         setTodoArray(newTodo)
    }

    const todoEdit=(id)=>{
       const todo = todoArray.find((todo)=> todo.id === id)
       setFormData({titulo: todo.titulo, descripcion: todo.descripcion})
       setTodoEditId(id)
    }
    
   return(
    <>
    <div className="container-max  cover-form">
        <form className="input-group shadow rounded p-3" onSubmit={addTodo}>
            <div className='container-form'>
            <input className="form-control" name='titulo'  type="text" placeholder="Titulo" value={formData.titulo} onChange={handleChange}/>
            <input className="form-control" name='descripcion'   type="text" placeholder="Descripcion" value={formData.descripcion} onChange={handleChange}/>
            <input className="btn btn-primary"   type="submit" value='Agegar Todo'/>
            </div>
        </form>
    </div>

    <div className="shadow rounded p-3 mt-5 w-100 cover-container">
        <div className="container-delete-tareas">
            <h4>Todo list</h4>
            <button onClick={deleteComplete}>Eliminar tareas completadas</button>
        </div>
        {
            todoArray.map((todo)=>
            <div key={todo.id} className='elementos-todo'>
               <input type="checkbox" checked={todo.isComplete} onChange={()=>toggleTodo(todo.id)}/>
               <p className={`p-0 m-0 flex-grow-1 ${todo.isComplete ? 'text-decoration-line-through' : ''}`}>  {todo.titulo}<br/>
               <span className='text-muted'>{todo.descripcion}</span></p>
               {todo.isComplete && <span className='bg-success'>Completada</span>}
               <button className='btn btn-warning'onClick={()=>todoEdit(todo.id)}>✏</button>
               <button className='btn btn-danger' onClick={()=>deleteTodo(todo.id)}>🗑</button>
            </div>
            )
        }
        <div className='total-info'>
            <span>Total de tareas: {todoArray.length} ,Completadas: {completeCount} ,Pendientes:{pendingCount}</span>
        </div>
    </div>
    </>
   )
}

export default TodoList