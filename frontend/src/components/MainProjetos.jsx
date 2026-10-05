function MainProjetos({ mainProjeto, handleRemove, handleUpdateEditando, handleUpdate, nomeProjetoUpdate, setNomeProjetoUpdate }){
  if (mainProjeto.editando) {
    return (
      <div className="projeto-card">
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

        <div className="projeto-card-actions">
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
    <div className="projeto-card">
      <h2 className="projeto-card-title">{mainProjeto.nomeProjeto}</h2>

      <div className="projeto-card-actions">
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