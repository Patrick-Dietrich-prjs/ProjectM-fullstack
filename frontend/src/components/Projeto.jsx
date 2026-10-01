import { useState, useEffect } from 'react'
import { getAll, save, remove, update, updateStatus, updateEditando } from '../services/ParteProjetoService'
import ParteProjeto from './ParteProjeto.jsx'

function Projeto(){

    const [partesProjeto, setPartesProjeto] = useState([])
    const [loading, setLoading] = useState(true)
    const [descricao, setDescricao] = useState("")
    const [descricaoUpdate, setDescricaoUpdate] = useState("")

    useEffect(() => {
        fetchpartesProjeto()
    }, [])

    function fetchpartesProjeto(){
        getAll()
            .then(response => {
                setPartesProjeto(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error("Erro ao buscar tarefas: " + error)
            })
    }

    function handleCreate(){
        if(!descricao.trim()) return
        const parteProjeto = { descricao, concluido: false, editando: false }
        save(parteProjeto)
            .then(() => {
                setDescricao("")
                fetchpartesProjeto()
            })
            .catch(error => {
                console.error("Erro ao criar tarefa: " + error)
            })
    }

    function handleRemove(id){
        remove(id)
            .then(() => fetchpartesProjeto())
            .catch(error => {
                console.error("Erro ao remover tarefa: " + error)
            })
    }

    function handleUpdateStatus(id){
        updateStatus(id)
            .then(() => fetchpartesProjeto())
            .catch(error => {
                console.error("Erro ao atualizar status da tarefa: " + error)
            })
    }

    function handleUpdateEditando(id){
        const parteProjeto = partesProjeto.find(t => t.id === id)

        if(parteProjeto) {
            setDescricaoUpdate(parteProjeto.descricao)
        }

        updateEditando(id)
            .then(() => fetchpartesProjeto())
            .catch(error => {
                console.error("Erro ao entrar em modo de edição: " + error)
            })
    }

    function handleUpdate(id){
        if (!descricaoUpdate.trim()) return

        const dadosAtuais = partesProjeto.find(parteProjeto => parteProjeto.id === id)

        const dadosUpdate = {...dadosAtuais, descricao: descricaoUpdate}

        update(id, dadosUpdate)
            .then(() => {
                return updateEditando(id)
            })
            .then(() => {
                setDescricaoUpdate("")
                fetchpartesProjeto()
            })
            .catch(error => {
                console.error("Erro ao atualizar status da tarefa: " + error)
            })
    }

    if(loading) {
        return <div>Carregando...</div>
    } else {
        return(<>
            <div className='parteProjeto-wrapper'>
                <div className='container'>
                    <h1>Projeto</h1>

                    <div className='input-box'>
                        <input
                            type='text'
                            value={descricao}
                            placeholder='Insira nova tarefa...'
                            onChange={e => (setDescricao(e.target.value))}/>
                        <button onClick={handleCreate}>Salvar</button>
                    </div>

                    <ol className='parteProjeto-list'>
                        {partesProjeto.length === 0 && (<p>Nenhuma tarefa cadastrada.</p>)}

                        {partesProjeto.map(parteProjeto => (parteProjeto.editando ? 

                            (<li key={parteProjeto.id} className='parteProjeto-item'>
                                        {parteProjeto.concluido ?
                                            (<input type='checkbox'
                                                    className="parteProjeto-checkbox"
                                                    onClick={() => handleUpdateStatus(parteProjeto.id)} defaultChecked>
                                            </input>) : 
                                            (<input type='checkbox'
                                                    className="parteProjeto-checkbox"
                                                    onClick={() => handleUpdateStatus(parteProjeto.id)} >
                                            </input>)}
                                        
                                        <div className='edit-box'>
                                            <input className='update-input-box' type='text' value={descricaoUpdate} onChange={e => setDescricaoUpdate(e.target.value)}></input>

                                            <button className='update-btn' onClick={() => handleUpdate(parteProjeto.id)}>Salvar</button>
                                        </div>                                        

                                        <button className='delete-btn' onClick={() => handleRemove(parteProjeto.id)}>🗑</button>

                                        <button className='edit-btn' onClick={() => handleUpdateEditando(parteProjeto.id)}>✏️</button>
                                    </li>) :
                            
                            (<li key={parteProjeto.id} className='parteProjeto-item'>
                                        {parteProjeto.concluido ?
                                            (<input type='checkbox'
                                                    className="parteProjeto-checkbox"
                                                    onClick={() => handleUpdateStatus(parteProjeto.id)} defaultChecked>
                                            </input>) : 
                                            (<input type='checkbox'
                                                    className="parteProjeto-checkbox"
                                                    onClick={() => handleUpdateStatus(parteProjeto.id)} >
                                            </input>)}

                                        <span>{parteProjeto.descricao}</span>

                                        <button className='delete-btn' onClick={() => handleRemove(parteProjeto.id)}>🗑</button>

                                        <button className='edit-btn' onClick={() => handleUpdateEditando(parteProjeto.id)}>✏️</button>
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

export default Projeto