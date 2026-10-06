import { useState, useEffect } from 'react'
import { getByProjetoId } from '../services/ParteProjetoService.js'

function BarraProgresso({ projeto }){

    const [partesProjeto, setPartesProjeto] = useState([])

    useEffect(() => {
        if (!projeto?.id) return

        getByProjetoId(projeto.id)
        .then(response => setPartesProjeto(response.data))
        .catch(error => console.error('Erro ao buscar tarefas: ' + error))
    }, [projeto.id])

    const total = partesProjeto.length
    const atual = partesProjeto.filter(parteProjeto => parteProjeto.concluido);

    return (
        <div className="barra-progresso-wrapper">
            <progress
            className="barra-progresso"
            value={atual.length}
            max={total || 1}
            />
            <p className="barra-progresso-label">
            {atual.length}/{total}
            </p>
        </div>
    )
}

export default BarraProgresso