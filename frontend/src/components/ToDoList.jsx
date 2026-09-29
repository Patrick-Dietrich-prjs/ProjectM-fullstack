import { useState, useEffect } from 'react'
import { getAll, save, remove, updateStatus } from '../services/ToDoService'

function ToDoList(){

    const [toDos, setToDos] = useState([])
    const [loading, setLoading] = useState(true)
    const [descricao, setDescricao] = useState("")

    useEffect(() => {
        fetchToDos()
    }, [])

    function fetchToDos(){
        getAll()
            .then(response => {
                setToDos(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error("Erro ao buscar tarefas: " + error)
            })
    }

    function handleCreate(){
        if(!descricao.trim()) return
        const toDo = { descricao, concluido: false }
        save(toDo)
            .then(() => {
                setDescricao("")
                fetchToDos()
            })
            .catch(error => {
                console.error("Erro ao criar tarefa: " + error)
            })
    }

    function handleRemove(id){
        remove(id)
            .then(() => fetchToDos())
            .catch(error => {
                console.error("Erro ao remover tarefa: " + error)
            })
    }

    function handleUpdateStatus(id){
        updateStatus(id)
            .then(() => fetchToDos())
            .catch(error => {
                console.error("Erro ao atualizar status da tarefa: " + error)
            })
    }

    if(loading) {
        return <div>Carregando...</div>
    } else {
        return(<>
            <div className='todo-wrapper'>
                <div className='container'>
                    <h1>ToDo List</h1>
                    <div className='input-box'>
                        <input
                            type='text'
                            value={descricao}
                            placeholder='Insira nova tarefa...'
                            onChange={e => (setDescricao(e.target.value))}/>
                        <button onClick={handleCreate}>Salvar</button>
                    </div>                    
                    <ol className='todo-list'>
                        {toDos.length === 0 && (<p>Nenhuma tarefa cadastrada.</p>)}
                        {toDos.map(toDo => 
                                    <li key={toDo.id} className='todo-item'>
                                        {toDo.concluido ? <input type='checkbox'
                                            className="todo-checkbox"
                                            onClick={() => handleUpdateStatus(toDo.id)} checked>
                                        </input> : <input type='checkbox'
                                            className="todo-checkbox"
                                            onClick={() => handleUpdateStatus(toDo.id)} >
                                        </input>}                                        
                                        <span>{toDo.descricao}</span>
                                        <button className='delete-btn' onClick={() => handleRemove(toDo.id)}>🗑</button>
                                    </li>)}
                    </ol>
                </div>
            </div>            
        </>)
    }
}

export default ToDoList