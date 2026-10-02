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

                        {partesProjeto.map(parteProjeto => (
                            <ParteProjeto 
                                parteProjeto={parteProjeto}
                                handleUpdateStatus={handleUpdateStatus}
                                handleRemove={handleRemove}
                                handleUpdateEditando={handleUpdateEditando}
                                handleUpdate={handleUpdate}
                                setDescricaoUpdate={setDescricaoUpdate}
                                descricaoUpdate={descricaoUpdate}
                            />))}
                    </ol>
                </div>
            </div>
        </>)
    }
}

export default Projeto