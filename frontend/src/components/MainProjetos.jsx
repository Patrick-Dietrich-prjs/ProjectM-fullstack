import { useNavigate } from 'react-router-dom'
import BarraProgresso from './BarraProgresso.jsx'

function MainProjetos({ mainProjeto, handleRemove, handleUpdateEditando, handleUpdate, nomeProjetoUpdate, setNomeProjetoUpdate }){

    const navigate = useNavigate()

    if (mainProjeto.editando) {
        return (
            <div className="projeto-card projeto-card--editing">
                <div className="edit-box">
                <input
                    className="update-input-box"
                    type="text"
                    value={nomeProjetoUpdate}
                    onChange={e => setNomeProjetoUpdate(e.target.value)}
                />
                <button
                    className="update-btn"
                    onClick={() => handleUpdate(mainProjeto.id)}
                >
                    Salvar
                </button>
                </div>

                <div className="projeto-card-actions" onClick={e => e.stopPropagation()}>
                <button
                    className="delete-btn"
                    onClick={() => handleRemove(mainProjeto.id)}
                >
                    🗑
                </button>
                <button
                    className="edit-btn"
                    onClick={() => handleUpdateEditando(mainProjeto.id)}
                >
                ✏️
                </button>
                </div>
            </div>
        )
    }

    return (
        <div className="projeto-card" onClick={() => navigate(`/projeto/${mainProjeto.id}`)}>
            <h2 className="projeto-card-title">{mainProjeto.nomeProjeto}</h2>

            <BarraProgresso 
                projeto={mainProjeto}
            />

            <div className="projeto-card-actions" onClick={e => e.stopPropagation()}>
                <button
                className="delete-btn"
                onClick={() => handleRemove(mainProjeto.id)}
                >
                🗑
                </button>
                <button
                className="edit-btn"
                onClick={() => handleUpdateEditando(mainProjeto.id)}
                >
                ✏️
                </button>
            </div>
        </div>
    )
}

export default MainProjetos