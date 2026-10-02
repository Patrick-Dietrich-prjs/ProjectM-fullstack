package com.patrick.projectM_backend.controller;

import com.patrick.projectM_backend.model.Projeto;
import com.patrick.projectM_backend.service.ProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projeto")
public class ProjetoController {
    @Autowired
    private ProjetoService ProjetoService;

    @GetMapping
    public List<Projeto> findAll(){ return ProjetoService.findAll(); }

    @GetMapping("{id}")
    public ResponseEntity<Projeto> findById(@PathVariable Long id){
        Optional<Projeto> projeto = ProjetoService.findById(id);
        if(projeto.isPresent()){
            return ResponseEntity.ok(projeto.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Projeto> save(@RequestBody Projeto projeto){
        Projeto save = ProjetoService.save(projeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(save);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        boolean deleted = ProjetoService.deleteById(id);
        if(deleted){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Projeto> update(@PathVariable Long id, @RequestBody Projeto projetoUpdate){
        Optional<Projeto> updated = ProjetoService.update(id, projetoUpdate);
        if(updated.isPresent()){
            return ResponseEntity.ok(updated.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("{id}/editando")
    public ResponseEntity<Projeto> updateEditando(@PathVariable Long id){
        Optional<Projeto> updated = ProjetoService.updateEditando(id);
        if(updated.isPresent()){
            return ResponseEntity.ok(updated.get());
        }
        return ResponseEntity.notFound().build();
    }
}
