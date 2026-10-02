package com.patrick.projectM_backend.service;

import com.patrick.projectM_backend.model.ParteProjeto;
import com.patrick.projectM_backend.model.Projeto;
import com.patrick.projectM_backend.repository.ParteProjetoRepository;
import com.patrick.projectM_backend.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ParteProjetoService {

    @Autowired
    private ParteProjetoRepository parteProjetoRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    public List<ParteProjeto> findAll() {
        return parteProjetoRepository.findAll();
    }

    public Optional<ParteProjeto> findById(Long id){
        return parteProjetoRepository.findById(id);
    }

    @Transactional
    public ParteProjeto save(ParteProjeto parteProjeto){
        if (parteProjeto.getProjeto() != null && parteProjeto.getProjeto().getId() != null) {
            Projeto projeto = projetoRepository.findById(parteProjeto.getProjeto().getId())
                    .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));
            parteProjeto.setProjeto(projeto);
        }
        return parteProjetoRepository.save(parteProjeto);
    }

    @Transactional
    public boolean deleteById(Long id){
        if(parteProjetoRepository.existsById(id)){
            parteProjetoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public Optional<ParteProjeto> updateStatus(Long id){
        return parteProjetoRepository.findById(id)
                .map(parteProjeto -> {
                    parteProjeto.setConcluido(!parteProjeto.getConcluido());
                    return parteProjetoRepository.save(parteProjeto);
                });
    }

    @Transactional
    public Optional<ParteProjeto> updateEditando(Long id){
        return parteProjetoRepository.findById(id)
                .map(parteProjeto -> {
                    parteProjeto.setEditando(!parteProjeto.getEditando());
                    return parteProjetoRepository.save(parteProjeto);
                });
    }

    @Transactional
    public Optional<ParteProjeto> update(Long id, ParteProjeto dadosUpdate) {
        return parteProjetoRepository.findById(id)
                .map(parteprojeto -> {
                    parteprojeto.setDescricao(dadosUpdate.getDescricao());
                    return parteProjetoRepository.save(parteprojeto);
                });
    }
}