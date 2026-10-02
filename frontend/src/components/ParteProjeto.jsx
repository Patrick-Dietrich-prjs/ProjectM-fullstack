

function ParteProjeto({ parteProjeto, handleRemove, handleUpdateStatus, handleUpdateEditando, handleUpdate, descricaoUpdate, setDescricaoUpdate}){
    
    return(<> 
        {parteProjeto.editando ? 
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
        }
        
    </>)
}

export default ParteProjeto