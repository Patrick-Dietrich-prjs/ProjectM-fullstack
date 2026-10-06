import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getById } from '../services/ProjetoService.js'
import { getByProjetoId, save, remove, update, updateStatus, updateEditando } from '../services/ParteProjetoService.js'
import ParteProjeto from '../components/ParteProjeto.jsx'
import BarraProgresso from '../components/BarraProgresso.jsx'

function PaginaProjeto() {
    const [projeto, setProjeto] = useState(null)
    const [partesProjeto, setPartesProjeto] = useState([])
    const [loading, setLoading] = useState(true)
    const [descricao, setDescricao] = useState('')
    const [descricaoUpdate, setDescricaoUpdate] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return

        setLoading(true)

        getById(id)
        .then(response => {
            setProjeto(response.data)
            return getByProjetoId(id)
        })
        .then(response => {
            setPartesProjeto(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.error('Erro ao carregar projeto: ' + error)
            setLoading(false)
        })
    }, [id])

    function fetchPartesProjeto() {
        getByProjetoId(id)
        .then(response => {
            setPartesProjeto(response.data)
        })
        .catch(error => {
            console.error('Erro ao buscar tarefas: ' + error)
        })
    }

    function handleCreate() {
        if (!descricao.trim() || !projeto) return

        const parteProjeto = { projeto, descricao, concluido: false, editando: false}

        save(parteProjeto)
        .then(() => {
            setDescricao('')
            fetchPartesProjeto()
        })
        .catch(error => {
            console.error('Erro ao criar tarefa: ' + error)
        })
    }

    function handleRemove(parteId) {
        remove(parteId)
        .then(() => fetchPartesProjeto())
        .catch(error => {
            console.error('Erro ao remover tarefa: ' + error)
        })
    }

    function handleUpdateStatus(parteId) {
        updateStatus(parteId)
        .then(() => fetchPartesProjeto())
        .catch(error => {
            console.error('Erro ao atualizar status: ' + error)
        })
    }

    function handleUpdateEditando(parteId) {
        const parte = partesProjeto.find(p => p.id === parteId)
        if (parte) {
        setDescricaoUpdate(parte.descricao)
        }

        updateEditando(parteId)
        .then(() => fetchPartesProjeto())
        .catch(error => {
            console.error('Erro ao entrar em modo de edição: ' + error)
        })
    }

    function handleUpdate(parteId) {
        if (!descricaoUpdate.trim()) return

        const dadosAtuais = partesProjeto.find(p => p.id === parteId)
        const dadosUpdate = { ...dadosAtuais, descricao: descricaoUpdate }

        update(parteId, dadosUpdate)
        .then(() => updateEditando(parteId))
        .then(() => {
            setDescricaoUpdate('')
            fetchPartesProjeto()
        })
        .catch(error => {
            console.error('Erro ao atualizar a tarefa: ' + error)
        })
    }

    if (loading || !projeto) {
        return <div className="loading-message">Carregando...</div>
    }

    return (
        <div className="parteProjeto-wrapper">
            <div className="container">
                <button className="update-btn" onClick={() => navigate('/')}>
                ← Voltar
                </button>

                <h1>{projeto.nomeProjeto}</h1>

                <div className="input-box">
                    <input
                        type="text"
                        value={descricao}
                        placeholder="Insira nova tarefa..."
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <button onClick={handleCreate}>+</button>
                </div>

                <BarraProgresso 
                    key={partesProjeto.map(p => p.id + '-' + p.concluido).join(',')}
                    projeto={projeto}
                />

                <ol className="parteProjeto-list">
                    {partesProjeto.length === 0 && (
                        <p className="empty-message">Nenhuma tarefa cadastrada.</p>
                    )}

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
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default PaginaProjeto