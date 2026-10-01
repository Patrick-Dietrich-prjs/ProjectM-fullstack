import { useState, useEffect } from 'react'
import { getAll, save, remove, update, updateStatus, updateEditando } from '../services/ToDoService'

function ToDoList(){

    const [toDos, setToDos] = useState([])
    const [loading, setLoading] = useState(true)
    const [descricao, setDescricao] = useState("")
    const [descricaoUpdate, setDescricaoUpdate] = useState("")

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
        const toDo = { descricao, concluido: false, editando: false }
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

    function handleUpdateEditando(id){
        const toDo = toDos.find(t => t.id === id)

        if(toDo) {
            setDescricaoUpdate(toDo.descricao)
        }

        updateEditando(id)
            .then(() => fetchToDos())
            .catch(error => {
                console.error("Erro ao entrar em modo de edição: " + error)
            })
    }

    function handleUpdate(id){
        if (!descricaoUpdate.trim()) return

        const dadosAtuais = toDos.find(toDo => toDo.id === id)

        const dadosUpdate = {...dadosAtuais, descricao: descricaoUpdate}

        update(id, dadosUpdate)
            .then(() => {
                return updateEditando(id)
            })
            .then(() => {
                setDescricaoUpdate("")
                fetchToDos()
            })
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

                        {toDos.map(toDo => (toDo.editando ? 

                            (<li key={toDo.id} className='todo-item'>
                                        {toDo.concluido ?
                                            (<input type='checkbox'
                                                    className="todo-checkbox"
                                                    onClick={() => handleUpdateStatus(toDo.id)} defaultChecked>
                                            </input>) : 
                                            (<input type='checkbox'
                                                    className="todo-checkbox"
                                                    onClick={() => handleUpdateStatus(toDo.id)} >
                                            </input>)}
                                        
                                        <div className='edit-box'>
                                            <input className='update-input-box' type='text' value={descricaoUpdate} onChange={e => setDescricaoUpdate(e.target.value)}></input>

                                            <button className='update-btn' onClick={() => handleUpdate(toDo.id)}>Salvar</button>
                                        </div>                                        

                                        <button className='delete-btn' onClick={() => handleRemove(toDo.id)}>🗑</button>

                                        <button className='edit-btn' onClick={() => handleUpdateEditando(toDo.id)}>✏️</button>
                                    </li>) :
                            
                            (<li key={toDo.id} className='todo-item'>
                                        {toDo.concluido ?
                                            (<input type='checkbox'
                                                    className="todo-checkbox"
                                                    onClick={() => handleUpdateStatus(toDo.id)} defaultChecked>
                                            </input>) : 
                                            (<input type='checkbox'
                                                    className="todo-checkbox"
                                                    onClick={() => handleUpdateStatus(toDo.id)} >
                                            </input>)}

                                        <span>{toDo.descricao}</span>

                                        <button className='delete-btn' onClick={() => handleRemove(toDo.id)}>🗑</button>

                                        <button className='edit-btn' onClick={() => handleUpdateEditando(toDo.id)}>✏️</button>
                                    </li>)
                                )
                            )
                        }
                    </ol>
                </div>
            </div>
        </>)
    }
}

export default ToDoList