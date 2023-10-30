import { useState } from 'react'
import './todolist.css'



const UserList=()=>{

    

    const [todoArray, setTodoArray] = useState([

        {
           nombre: 'nayeli',
           email: 'nayeli1@gmail.com',
           isComplete: false,
           id:1
        },
        {
            nombre: 'santi',
            email: 'santi1@gmail.com',
            isComplete: false,
            id:2
        }
       
       ])

    const completeCount= todoArray.filter( todo=> todo.isComplete === true).length
    const pendingCount= todoArray.length - completeCount
    const [formData, setFormData] = useState({
        nombre: '',
        email: ''
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
          todo.nombre = formData.nombre
          todo.email = formData.email
          setTodoArray(newTodo)
          setTodoEditId(null)
          setFormData({nombre: '',email: ''})
      } else {
        if(formData.nombre !== '' && formData.email !== ''){
            const todo = formData
            todo.isComplete == false
            todo.id = Date.now()
    
          setTodoArray([...todoArray, todo])
          setFormData({nombre: '',email: ''})
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
       setFormData({nombre: todo.nombre, email: todo.email})
       setTodoEditId(id)
    }
    
   return(
    <>
    <div className="container-max  cover-form">
        <form className="input-group shadow rounded p-3" onSubmit={addTodo}>
            <div className='container-form'>
            <input className="form-control" name='nombre'  type="text" placeholder="Nombre y apellido" value={formData.nombre} onChange={handleChange}/>
            <input className="form-control" name='email'   type="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
            <input className="form-control" name='telefono'   type="text" placeholder="telefono" value={formData.telefono} onChange={handleChange}/>
            <input className="btn btn-primary"   type="submit" value='Agegar'/>
            </div>
        </form>
    </div>

    <div className="shadow rounded p-3 mt-5 w-100 cover-container">
        <div className="container-delete-tareas">
            <h4>Usuarios</h4>
        </div>
        {
            todoArray.map((todo)=>
            <div key={todo.id} className='elementos-todo'>
               <input type="checkbox" checked={todo.isComplete} onChange={()=>toggleTodo(todo.id)}/>
               <p className={`p-0 m-0 flex-grow-1 ${todo.isComplete ? 'text-decoration-line-through' : ''}`}>  {todo.nombre}<br/>
               <span className='text-muted'>{todo.email}</span></p>
               {todo.isComplete && <span className='bg-danger'>Inactivo</span>}
               <button className='btn btn-warning'onClick={()=>todoEdit(todo.id)}>✏</button>
               <button className='btn btn-danger' onClick={()=>deleteTodo(todo.id)}>🗑</button>
            </div>
            )
        }
        <div className='total-info'>
            <span>Total de clientes: {todoArray.length} ,Fuera de servicio: {completeCount} ,Activos:{pendingCount}</span>
        </div>
    </div>
    </>
   )
}

export default UserList