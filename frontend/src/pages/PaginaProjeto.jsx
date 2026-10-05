import { useState, useEffect } from 'react'
import { getByProjetoId, save, remove, update, updateStatus, updateEditando } from '../services/ParteProjetoService.js'
import ParteProjeto from '../components/ParteProjeto.jsx'

function PaginaProjeto({ projeto }){

    const [partesProjeto, setPartesProjeto] = useState([])
    const [loading, setLoading] = useState(true)
    const [descricao, setDescricao] = useState("")
    const [descricaoUpdate, setDescricaoUpdate] = useState("")
    

    useEffect(() => {
        fetchpartesProjeto()
    }, [])

    function fetchpartesProjeto(){
        getByProjetoId(projeto.id)
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
        const parteProjeto = { projeto, descricao, concluido: false, editando: false }
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
        const parteProjeto = partesProjeto.find(p => p.id === id)

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
                console.error("Erro ao atualizar a tarefa: " + error)
            })
    }

    if(loading) {
        return <div>Carregando...</div>
    } else {
        return(<>
            <div className='parteProjeto-wrapper'>
                <div className='container'>
                    <h1>{projeto.nomeProjeto}</h1>

                    <div className='input-box'>
                        <input
                            type='text'
                            value={descricao}
                            placeholder='Insira nova tarefa...'
                            onChange={e => (setDescricao(e.target.value))}/>
                        <button onClick={handleCreate}>+</button>
                    </div>

                    <ol className='parteProjeto-list'>                       
                        {partesProjeto.length === 0 && (<p>Nenhuma tarefa cadastrada.</p>)}

                        {partesProjeto.map(parteProjeto => (
                            <ParteProjeto 
                                key={parteProjeto.id}
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

export default PaginaProjeto