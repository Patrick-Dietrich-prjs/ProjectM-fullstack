package com.patrick.projectM_backend.service;

import com.patrick.projectM_backend.model.Projeto;
import com.patrick.projectM_backend.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    public List<Projeto> findAll(){
        return projetoRepository.findAll();
    }

    public Optional<Projeto> findById(Long id){
        return projetoRepository.findById(id);
    }

    @Transactional
    public Projeto save(Projeto projeto){
        return projetoRepository.save(projeto);
    }

    @Transactional
    public boolean deleteById(Long id){
        if(projetoRepository.existsById(id)){
            projetoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public Optional<Projeto> update(Long id, Projeto projetoUpdate){
        return projetoRepository.findById(id)
                .map(projeto -> {
                    projeto.setNomeProjeto(projetoUpdate.getNomeProjeto());
                    return projetoRepository.save(projeto);
                });
    }

    @Transactional
    public Optional<Projeto> updateEditando(Long id){
        return projetoRepository.findById(id)
                .map(projeto ->  {
                    projeto.setEditando(!projeto.isEditando());
                    return projetoRepository.save(projeto);
                });
    }
}
