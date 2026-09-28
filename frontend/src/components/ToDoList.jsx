import { useState } from 'react'

function ToDoList(){

    const [toDo, setToDo] = useState(["1", "2", "3"])
    const [newToDo, setNewToDo] = useState("")

    function handleInputChange(event){
        setNewToDo(event.target.value)
    }

    function addToDo(){
        if(newToDo.trim() !== ""){
            setToDo(t => [...t, newToDo])
            setNewToDo("")
        }        
    }

    function deleteToDo(index){
        const updatedToDo = toDo.filter((_, i) => i !== index)
        setToDo(updatedToDo)
    }

    return(<>
        <div className='container'>
            <h1>ToDo List</h1>
            <div className='input-box'>
                <input
                    type='text'
                    value={newToDo}
                    placeholder='Insira nova tarefa...'
                    onChange={handleInputChange}/>
                <button onClick={addToDo}>Salvar</button>
            </div>
            <ol>
                {toDo.map((toDo, index) => 
                            <li key={index}>
                                <span>{toDo}</span>
                                <button onClick={() => deleteToDo(index)}>🗑</button>
                            </li>)}
            </ol>
        </div>
    </>)
}

export default ToDoList