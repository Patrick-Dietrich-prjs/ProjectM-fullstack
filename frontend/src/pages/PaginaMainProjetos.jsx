import { useState, useEffect } from 'react'
import { getAll, save, remove, update, updateEditando } from '../services/ProjetoService.js'
import Projeto from './Projeto.jsx'

function PaginaMainProjetos(){
    const [projetos, setProjetos] = useState([])
    const [loading, setLoading] = useState(true)
    const [nomeProjeto, setNomeProjeto] = useState("")

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

    if(loading) {
        return <div>Carregando...</div>
    } else {
        return(<>
            <h1>ProjectM - Gerenciador de Projetos</h1>

            <div className='input-box'>
                <input
                    type='text'
                    value={nomeProjeto}
                    placeholder='Insira novo projeto...'
                    onChange={e => (setNomeProjeto(e.target.value))}/>
                <button onClick={handleCreate}>Salvar</button>
            </div>

            <div className="container-projetos">
                {projetos.map(projeto => 
                    <Projeto
                        projeto={projeto}
                        key={projeto.id} />
                    )
                }
            </div>
        </>)
    }
}

export default PaginaMainProjetos