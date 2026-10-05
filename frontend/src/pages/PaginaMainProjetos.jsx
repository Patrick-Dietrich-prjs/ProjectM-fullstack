import { useState, useEffect } from 'react'
import { getAll, getById, save, remove, update, updateEditando } from '../services/ProjetoService.js'
import MainProjetos from '../components/MainProjetos.jsx'

function PaginaMainProjetos(){
    const [projetos, setProjetos] = useState([])
    const [loading, setLoading] = useState(true)
    const [nomeProjeto, setNomeProjeto] = useState("")
    const [nomeProjetoUpdate, setNomeProjetoUpdate] = useState("")    

    useEffect(() => {
        fetchProjetos()
    }, [])
    
    function fetchProjetos(){
        getAll()
            .then(response => {
                setProjetos(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error("Erro ao buscar projeto: " + error)
            })
    }

    function handleCreate(){
        if(!nomeProjeto.trim()) return
        const projeto = { nomeProjeto, editando: false}
        save(projeto)
            .then(() => {
                setNomeProjeto("")
                fetchProjetos()
            })
            .catch(error => {
                console.error("Erro ao criar projeto: " + error)
            })
    }

    function handleRemove(id){
        remove(id)
            .then(() => fetchProjetos())
            .catch(error => {
                console.error("Erro ao remover projeto: " + error)
            })
    }

    function handleUpdateEditando(id){
        getById(id)
            .then(response => {
                const projeto = response.data
                setNomeProjetoUpdate(projeto.nomeProjeto)
            })       

        updateEditando(id)
            .then(() => fetchProjetos())
            .catch(error => {
                console.error("Erro ao entrar em modo de edição: " + error)
            })
    }

    function handleUpdate(id){
        if (!nomeProjetoUpdate.trim()) return

        const atual = getById(id)

        const updated = {...atual, nomeProjeto: nomeProjetoUpdate}

        update(id, updated)
            .then(() => {
                return updateEditando(id)
            })
            .then(() => {
                setNomeProjetoUpdate("")
                fetchProjetos()
            })
            .catch(error => {
                console.error("Erro ao atualizar o projeto: " + error)
            })
    }

    if(loading) {
        return <div>Carregando...</div>
    } else {
        return (
            <div className="page">
                <h1 className="page-title">ProjectM - Gerenciador de Projetos</h1>

                <div className="input-box">
                <input
                    type="text"
                    value={nomeProjeto}
                    placeholder="Insira novo projeto..."
                    onChange={e => setNomeProjeto(e.target.value)}
                />
                <button onClick={handleCreate}>+</button>
                </div>

                <div className="container-projetos">
                    {projetos.map(projeto => (
                        <MainProjetos
                        key={projeto.id}
                        mainProjeto={projeto}
                        handleRemove={handleRemove}
                        handleUpdateEditando={handleUpdateEditando}
                        handleUpdate={handleUpdate}
                        nomeProjetoUpdate={nomeProjetoUpdate}
                        setNomeProjetoUpdate={setNomeProjetoUpdate}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default PaginaMainProjetos